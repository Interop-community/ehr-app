import React from 'react';
import AppMenu from "./Navigation/AppMenu";
import { Paper } from "material-ui";
import ShowApp from "./ShowApp";
import PatientSelectorDialog from "./Navigation/DialogBoxes/PatientSelectorDialog";
import PersonaSelectorDialog from "./Navigation/DialogBoxes/PersonaSelectorDialog";
import logo from '../assets/images/hspc-sndbx-logo.png';
import { call, setPersonaCookie } from "../utils";

import './Home.css';
import HeaderBar from "./Navigation/Header/HeaderBar";

const divStyle = {
    float: 'left',
    backgroundColor: '#4D5B66',
    width: '224px',
    height: 'calc(100vh - 60px)',
    borderRadius: 0
};

export default class Home extends React.Component {
    constructor (props) {
        super(props);

        let cookieData = this.getCookieData();
        let params = {};
        cookieData.encounter && (params.encounter = cookieData.encounter);
        cookieData.location && (params.location = cookieData.location);
        cookieData.resource && (params.resource = cookieData.resource);
        cookieData.smartStyleUrl && (params.smartStyleUrl = cookieData.smartStyleUrl);
        cookieData.intent && (params.intent = cookieData.intent);
        cookieData.contextParams && (cookieData.contextParams.map(c => {
            params[c.name] = c.value;
        }));

        this.state = {
            bearer: cookieData.token,
            sandboxApi: cookieData.sandboxApiUrl,
            sandboxId: cookieData.sandboxId,
            refApi: cookieData.refApi,

            params,

            selectedPersona: null,
            selectedPatient: null,
            listApps: null,

            showPatientSelector: !cookieData.patientId,
            showPersonaSelector: !cookieData.personaId,

            launchCodeUrl: `${window.location.protocol}//${cookieData.refApi}/${cookieData.sandboxId}/data/_services/smart/Launch`,
            personaAuthenticationUrl: `${window.location.protocol}//${cookieData.sandboxApiUrl}/userPersona/authenticate`,
            registeredAppsUrl: `${window.location.protocol}//${cookieData.sandboxApiUrl}/app?sandboxId=${cookieData.sandboxId}`
        }
    }

    componentWillMount () {
        let cookieData = this.getCookieData();

        call(this.state.registeredAppsUrl, this.state.bearer)
            .then(loadedApps => {
                loadedApps = loadedApps || [];
                let state = { loadedApps };
                if (cookieData.appId) {
                    state.currentApp = loadedApps.find(i => i.id == cookieData.appId);
                }
                this.setState(state);
            });

        cookieData.personaId &&
        call(`${window.location.protocol}//${cookieData.sandboxApiUrl}/userPersona?sandboxId=${cookieData.sandboxId}`, this.state.bearer)
            .then(users => {
                let selectedPersona = users.find(i => i.id == cookieData.personaId);
                this.setState({ selectedPersona });
            });

        cookieData.patientId &&
        call(`${window.location.protocol}//${cookieData.refApi}/${cookieData.sandboxId}/data/Patient/${cookieData.patientId}`, this.state.bearer)
            .then(patient => {
                this.setState({ selectedPatient: { resource: patient }, selectedPatientId: patient.id });
            });
    }

    componentWillUpdate (np, nextState) {
        // Reload the application with the new context
        this.state.selectedPatient && nextState.selectedPatient && this.state.selectedPatient.resource.id !== nextState.selectedPatient.resource.id &&
        this.state.currentApp && this.handleAppMenu(this.state.currentApp, nextState.selectedPatient.resource.id);
        this.state.selectedPersona && nextState.selectedPersona && this.state.selectedPersona.fhirId !== nextState.selectedPersona.fhirId &&
        this.state.currentApp && this.handleAppMenu(this.state.currentApp, nextState.selectedPatient.resource.id, nextState.selectedPersona);

        (nextState.selectedPatient && nextState.selectedPersona && nextState.currentApp &&
            (!this.state.currentApp || !this.state.selectedPatient || !this.state.selectedPatient.resource.id || !this.state.selectedPersona)) &&
        this.handleAppMenu(nextState.currentApp, nextState.selectedPatient.resource.id, nextState.selectedPersona);
    }

    render () {
        return <div className="home-screen-wrapper">
            <HeaderBar patient={this.state.selectedPatient} persona={this.state.selectedPersona} togglePatientSelector={() => this.setState({ showPatientSelector: true })}
                       togglePersonaSelector={() => this.setState({ showPersonaSelector: true })}/>
            <PersonaSelectorDialog refApi={this.state.refApi} patient={this.state.selectedPatient} open={this.state.showPersonaSelector}
                                   bearer={this.state.bearer} sandboxApi={this.state.sandboxApi} sandboxId={this.state.sandboxId}
                                   handlePersonaSelection={e => this.setState({ selectedPersona: e })} onClose={() => this.setState({ showPersonaSelector: false })}
            />
            <PatientSelectorDialog refApi={this.state.refApi} patient={this.state.selectedPatient}
                                   bearer={this.state.bearer} sandboxApi={this.state.sandboxApi} sandboxId={this.state.sandboxId}
                                   open={this.state.showPatientSelector}
                                   onClose={() => this.setState({ showPatientSelector: false })}
                                   handlePatientSelection={e => this.setState({ selectedPatient: e, selectedPatientId: e.resource.id })}
            />
            <Paper style={divStyle}>
                {this.state.loadedApps && <AppMenu patient={this.state.selectedPatient} handleAppMenu={this.handleAppMenu} apps={this.state.loadedApps}
                                                   selectedItem={this.state.currentApp ? this.state.currentApp.id : undefined}/>}
            </Paper>
            {this.state.selectedPatient && !this.state.currentApp && this.state.loadedApps && <div className="ehr-content-wrapper padding">
                <span>
                    <img src={logo} style={{ height: '108px' }}/>
                </span>
                <span>Please select any app</span>
            </div>}
            {this.state.selectedPatient && this.state.selectedPersona && this.state.currentApp && <div className="ehr-content-wrapper">
                <ShowApp patient={this.state.selectedPatient} url={this.state.url}/>
            </div>}
        </div>;
    }

    handleAppMenu = (e, patient = this.state.selectedPatientId, persona = this.state.selectedPersona) => {
        this.setState({ currentApp: e, url: undefined });
        let parameters = {
            patient: patient,
            need_patient_banner: false,
            ...this.state.params
        };

        if (!!e) {
            let body = {
                client_id: e.clientName,
                parameters
            };

            call(this.state.launchCodeUrl, this.state.bearer, 'POST', body)
                .then(data => {
                    if (data.launch_id) {
                        let url = `${e.launchUri}?iss=${window.location.protocol}//${this.state.refApi}/${e.sandbox.sandboxId}/data&launch=${data.launch_id}`;
                        this.setState({ url });
                        try {
                            if (persona.personaUserId != null) {
                                let credentials = {
                                    username: persona.personaUserId,
                                    password: persona.password
                                };

                                call(this.state.personaAuthenticationUrl, undefined, 'POST', credentials)
                                    .then(personaAuthResult => {
                                        setPersonaCookie(personaAuthResult.jwt);
                                    }).catch(function (error) {
                                    console.log(error);
                                });
                            }
                        } catch (e) {
                            console.log("There is no persona.")
                        }
                    }
                });
        }
    };

    getCookieData = () => {
        let data = {};
        let name = 'hspc-launch-token=';
        let decodedCookie = decodeURIComponent(document.cookie);
        if (decodedCookie.indexOf(name) >= 0) {
            let ca = decodedCookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    data = c.substring(name.length, c.length);
                }
            }

            sessionStorage.launchData = data;
            data = JSON.parse(data);

            // const domain = window.location.host.split(":")[0].split(".").slice(-2).join(".");
            // document.cookie = `hspc-launch-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${domain}; path=/`;
        } else if (sessionStorage.launchData) {
            data = JSON.parse(sessionStorage.launchData);
        }

        return data;
    };
}
