import React from 'react';
import AppMenu from "./Navigation/AppMenu";
import {Paper} from "material-ui";
import ShowApp from "./ShowApp";
import PatientView from "./Patient/PatientView";
import GuestGreeting from "./Greeting/GuestGreeting";
import MainGreeting from "./Greeting/MainGreeting";

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bearer: props.match.params.bearer,
            sandboxApi: props.match.params.sandboxApi,
            sandboxId: props.match.params.sandboxId,
            show: true,
            blah: "Parent",
            selectedPersona: null,
            selectedPersonaName: "Persona Info here",
            selectedPatient: null,
            listApps: null,
            selectedPatientName: "Patient Info Here",
            currentAppName: "App Goes here",
            getLaunchCodeUrl: "https://api.hspconsortium.org/hspcdemo/data/_services/smart/Launch",
            guideMessage: "Please select a patient and app to render view."

        }
    }

    handlePersonaSelection = (e) => {
        this.setState({selectedPersona: e});
        this.setState({selectedPersonaName: e.personaName})
    }

    handlePatientSelection = (e) => {
        this.setState({selectedPatient: e});
        console.log(e);
        console.log("patient");
        this.setState({selectedPatientName: e.resource.name[0].family})
        this.setState({selectedPatientId: e.resource.id})
    }

    handleAppMenu = (e) => {
        this.setState({currentApp: e});
        this.setState({currentAppLaunchUri: e[0].launchUri});
        this.setState({currentAppName: e[0].authClient.clientName});
        //make json obj
        var text = '{ "client_id":"' + e[0].authClient.clientName+ '","parameters":{"patient":"' + this.state.selectedPatientId + '","need_patient_banner":false}}';
        var obj = JSON.parse(text);
        //make call to get launch code
        fetch(this.state.getLaunchCodeUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${this.state.bearer}`
            },
            body: JSON.stringify(obj)
        })
            .then( response => response.json() )
            .then((responseData) => {
                console.log("Response data");
                console.log(responseData);
                this.setState({url: e[0].launchUri + "?iss=https://api.hspconsortium.org/" + e[0].sandbox.sandboxId + "/data&launch=" + responseData.launch_id});
                console.log(this.state.url);

            })
    }

    render(){

        const divStyle = {
            float: 'left',
            backgroundColor: '#4D5B66',
            width: '185px',
            height: '800px',
        };

        const appStyle = {
            float: 'left',
        };

        const patientDivStyle = {
            float: 'left',
            width: '100%',
            height: '80px',
            background: 'linear-gradient(#3EA8E7,#0C76B4)',
            borderStyle: 'solid',
            borderWidth: '1px',

        };

        return(
            <div>
                <PatientView
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
                        handleAppMenu={this.handleAppMenu}
                        bearer={this.props.match.params.bearer}
                        sandboxApi={this.props.match.params.sandboxApi}
                        sandboxId={this.props.match.params.sandboxId}
                    />
                </Paper>

                <Paper style={appStyle}>
                    <ShowApp
                        url={this.state.url}
                    />
                </Paper>
            </div>
        );
    }

}