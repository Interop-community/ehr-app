import React from 'react';
import AppMenu from "./Navigation/AppMenu";
import {Paper, Card, Divider, CardText} from "material-ui";
import ShowApp from "./ShowApp";
import PatientView from "./Patient/PatientView";
import PersonaView from "./Persona/PersonaTable";
import {call, setPersonaCookie, removePersonaCookie, getPersonaCookie} from "../utils";

import './Home.css';

const divStyle = {
    float: 'left',
    backgroundColor: '#4D5B66',
    width: '185px',
    height: 'calc(100vh - 82px)',
    borderRadius: 0
};

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bearer: props.match.params.bearer,
            sandboxApi: props.match.params.sandboxApi,
            sandboxId: props.match.params.sandboxId,
            refApi: props.match.params.refApi,

            selectedPersona: null,
            selectedPatient: null,
            listApps: null,

            launchCodeUrl: `${window.location.protocol}//${props.match.params.refApi}/${props.match.params.sandboxId}/data/_services/smart/Launch`,
            personaAuthenticationUrl: `${window.location.protocol}//${props.match.params.sandboxApi}/userPersona/authenticate`,
            registeredAppsUrl: `${window.location.protocol}//${props.match.params.sandboxApi}/app?sandboxId=${props.match.params.sandboxId}`
        }
    }

    componentWillMount() {
        call(this.state.registeredAppsUrl, this.state.bearer)
            .then(loadedApps => {
                loadedApps = loadedApps || [];
                this.setState({loadedApps})
            });
    }

    componentWillUpdate(np, nextState) {
        // Reload the application with the new context
        this.state.selectedPatient && nextState.selectedPatient && this.state.selectedPatient.resource.id !== nextState.selectedPatient.resource.id &&
        this.state.currentApp && this.handleAppMenu(this.state.currentApp, nextState.selectedPatient.resource.id);
    }

    render() {
        return <div className="home-screen-wrapper">
            {!this.state.selectedPersona &&
            <PersonaView refApi={this.state.refApi} patient={this.state.selectedPatient}
                        bearer={this.state.bearer} sandboxApi={this.state.sandboxApi} sandboxId={this.state.sandboxId}
                        handleSelectedDoc={e => this.setState({selectedPersona: e})}
            />}
            {this.state.selectedPersona &&
            <PatientView refApi={this.state.refApi} patient={this.state.selectedPatient}
                         bearer={this.state.bearer} sandboxApi={this.state.sandboxApi} sandboxId={this.state.sandboxId}
                         handlePatientSelection={e => this.setState({selectedPatient: e, selectedPatientId: e.resource.id})}
            />}
            <Paper style={divStyle}>
                {this.state.loadedApps && <AppMenu patient={this.state.selectedPatient} handleAppMenu={this.handleAppMenu} apps={this.state.loadedApps}
                                                   selectedItem={this.state.currentApp ? this.state.currentApp.id : undefined}/>}
            </Paper>
            {this.state.selectedPatient && !this.state.currentApp && this.state.loadedApps && <div className="ehr-content-wrapper padding">{this.buildAppCards()}</div>}
            {this.state.currentApp && <div className="ehr-content-wrapper">
                <ShowApp patient={this.state.selectedPatient} url={this.state.url}/>
            </div>}
        </div>;
    }

    buildAppCards() {
        return this.state.loadedApps.map(d =>
            <Card className="app-card" key={d.id} onClick={() => this.handleAppMenu(d)}>
                <CardText className="card-body">
                    <img src={d.logoUri}/>
                    <Divider/>
                    <span className="card-title">{d.authClient.clientName}</span>
                </CardText>
            </Card>
        );
    }

    handleAppMenu = (e, patient = this.state.selectedPatientId) => {
        this.setState({currentApp: e, url: undefined});

        let credentials = {
            username: this.state.selectedPersona.personaUserId,
            password: this.state.selectedPersona.password
        };
        let body = {
            client_id: e.authClient.clientName,
            parameters: {
                patient: patient,
                need_patient_banner: false
            }
        };

        call(this.state.launchCodeUrl, this.state.bearer, 'POST', body)
            .then(data => {
                let url = `${e.launchUri}?iss=${window.location.protocol}//${this.state.refApi}/${e.sandbox.sandboxId}/data&launch=${data.launch_id}`;
                this.setState({url});

                call(this.state.personaAuthenticationUrl, undefined, 'POST', credentials)
                    .then(personaAuthResult => {
                        setPersonaCookie(personaAuthResult.jwt);
                    }).catch(function (error) {
                    console.log(error);
                });
            });
    };
}
