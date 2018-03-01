import React from 'react';
import AppMenu from "./Navigation/AppMenu";
import {Paper} from "material-ui";
import ShowApp from "./ShowApp";
import PatientView from "./Patient/PatientView";

const divStyle = {
    float: 'left',
    backgroundColor: '#4D5B66',
    width: '185px',
    height: '800px',
};

const appStyle = {
    float: 'left',
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
            getLaunchCodeUrl: "https://" + props.match.params.refApi + "/" + props.match.params.sandboxId + "/data/_services/smart/Launch",
            getLocalLaunchCodeUrl: "http://" + props.match.params.refApi + "/" + props.match.params.sandboxId + "/data/_services/smart/Launch",
            guideMessage: "Please select a patient and app to render view."

        }
    }

    handlePersonaSelection = (e) => {
        this.setState({selectedPersona: e});
        this.setState({selectedPersonaName: e.personaName})
    };

    handlePatientSelection = (e) => {
        this.setState({selectedPatient: e});
        this.setState({selectedPatientName: e.resource.name[0].family})
        this.setState({selectedPatientId: e.resource.id})
    };

    handleAppMenu = (e) => {
        this.setState({currentApp: e});
        this.setState({currentAppLaunchUri: e[0].launchUri});
        this.setState({currentAppName: e[0].authClient.clientName});
        //make json obj
        let text = '{ "client_id":"' + e[0].authClient.clientName + '","parameters":{"patient":"' + this.state.selectedPatientId + '","need_patient_banner":false}}';
        let obj = JSON.parse(text);
        //make call to get launch code
        let launchCodeUri = this.state.getLaunchCodeUrl;
        if (this.state.refApi.includes("localhost")) {
            launchCodeUri = this.state.getLocalLaunchCodeUrl;
        }
        fetch(launchCodeUri, {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=UTF-8', 'Authorization': `Bearer ${this.state.bearer}`},
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then((responseData) => {
                this.setState({url: e[0].launchUri + "?iss=https://" + this.state.refApi + "/" + e[0].sandbox.sandboxId + "/data&launch=" + responseData.launch_id});
                if (this.state.refApi.includes("localhost")) {
                    this.setState({url: e[0].launchUri + "?iss=http://" + this.state.refApi + "/" + e[0].sandbox.sandboxId + "/data&launch=" + responseData.launch_id});
                }
            })
    };

    render() {
        return (
            <div>
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
                    handlePersonaSelection={this.handlePersonaSelection}
                />
                <Paper style={divStyle}>
                    <AppMenu
                        patient={this.state.selectedPatient}
                        handleAppMenu={this.handleAppMenu}
                        bearer={this.props.match.params.bearer}
                        sandboxApi={this.props.match.params.sandboxApi}
                        sandboxId={this.props.match.params.sandboxId}
                    />
                </Paper>
                <Paper style={appStyle}>
                    <ShowApp patient={this.state.selectedPatient} url={this.state.url}/>
                </Paper>
            </div>
        );
    }

}
