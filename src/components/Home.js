import React from 'react';
import AppMenu from "./Navigation/AppMenu";
import {Paper, Card, Divider, CardText} from "material-ui";
import ShowApp from "./ShowApp";
import PatientView from "./Patient/PatientView";

import './Home.css';

const biliApp = {
    "id": 8453465343468,
    "createdBy": {
        "id": 5,
        "createdTimestamp": null,
        "email": "travis@interopion.com",
        "sbmUserId": "6c1daa0a-36d9-4840-3d5a-a5c9beb344ee",
        "name": "Travis Cummings",
        "hasAcceptedLatestTermsOfUse": null
    },
    "createdTimestamp": 1513012947000,
    "visibility": "PUBLIC",
    "sandbox": {
        "id": 23,
        "createdBy": {
            "id": 17,
            "createdTimestamp": null,
            "email": "hspc demo",
            "sbmUserId": "hspc demo",
            "name": "HSPC Demo",
            "hasAcceptedLatestTermsOfUse": null
        },
        "createdTimestamp": null,
        "visibility": "PRIVATE",
        "sandboxId": "hspcdemo",
        "name": "HSPC Demo Sandbox",
        "description": "HSPC Demo Sandbox",
        "apiEndpointIndex": "1",
        "fhirServerEndPoint": null,
        "allowOpenAccess": true
    },
    "launchUri": "https://bilirubin-risk-chart.hspconsortium.org/launch.html",
    "appManifestUri": null,
    "softwareId": null,
    "fhirVersions": null,
    "logoUri": null,
    "authClient": {
        "id": 1,
        "clientName": "Bilirubin Chart",
        "clientId": "bilirubin_chart",
        "redirectUri": "https://bilirubin-risk-chart.hspconsortium.org/index.html",
        "logoUri": "https://content.hspconsortium.org/images/bilirubin/logo/bilirubin.png",
        "authDatabaseId": null
    },
    "samplePatients": null,
    "clientJSON": null,
    "info": null,
    "briefDescription": null,
    "author": null
};

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
            show: true,
            blah: "Parent",
            selectedPersona: null,
            selectedPersonaName: "Persona Info here",
            selectedPatient: null,
            listApps: null,
            selectedPatientName: "Patient Info Here",
            currentAppName: "App Goes here",
            getLaunchCodeUrl: `${window.location.protocol}//${props.match.params.refApi}/${props.match.params.sandboxId}/data/_services/smart/Launch`,
            guideMessage: "Please select a patient and app to render view."

        }
    }

    componentWillMount() {
        let token = this.props.match.params.bearer;
        let url = `${window.location.protocol}//${this.props.match.params.sandboxApi}/app?sandboxId=${this.props.match.params.sandboxId}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then((loadedApps) => {
                loadedApps = loadedApps || [];
                // loadedApps.push(biliApp);
                this.setState({loadedApps})
            });
    }

    componentWillUpdate(np, nextState) {
        this.state.selectedPatient && nextState.selectedPatient && this.state.selectedPatient.resource.id !== nextState.selectedPatient.resource.id &&
        this.state.currentApp && this.handleAppMenu(this.state.currentApp, nextState.selectedPatient.resource.id);
    }

    render() {
        return <div className="home-screen-wrapper">
            <PatientView
                refApi={this.state.refApi}
                patient={this.state.selectedPatient}
                selectedPersonaName={this.state.selectedPersonaName}
                bearer={this.state.bearer}
                sandboxApi={this.state.sandboxApi}
                sandboxId={this.state.sandboxId}
                handlePatientSelection={this.handlePatientSelection}
                handleAppMenu={this.handleAppMenu}
                currentApp={this.state.currentApp}
                handlePersonaSelection={this.handlePatientSelection}
            />
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

    handlePatientSelection = (e) => {
        this.setState({selectedPatient: e, selectedPatientName: e.resource.name[0].family, selectedPatientId: e.resource.id});
    };

    handleAppMenu = (e, patient = this.state.selectedPatientId) => {
        this.setState({currentApp: e, currentAppLaunchUri: e.launchUri, currentAppName: e.authClient.clientName, url: undefined});

        //make json obj
        let text = `{"client_id":"${e.authClient.clientName}","parameters":{"patient":"${patient}","need_patient_banner":false}}`;
        let obj = JSON.parse(text);

        //make call to get launch code
        fetch(this.state.getLaunchCodeUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=UTF-8', 'Authorization': `Bearer ${this.state.bearer}`},
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then((responseData) => {
                let url = `${e.launchUri}?iss=${window.location.protocol}//${this.state.refApi}/${e.sandbox.sandboxId}/data&launch=${responseData.launch_id}`;
                this.setState({url});
            })
    };
}
