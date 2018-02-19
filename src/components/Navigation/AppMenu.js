import React, {Component} from 'react';
import {Menu, MenuItem} from "material-ui";

const biliApp = {"id":1,
    "createdBy":{
        "id":5,
        "createdTimestamp":null,
        "email":"travis@interopion.com",
        "sbmUserId":"6c1daa0a-36d9-4840-3d5a-a5c9beb344ee",
        "name":"Travis Cummings",
        "hasAcceptedLatestTermsOfUse":null
    },
    "createdTimestamp":1513012947000,
    "visibility":"PUBLIC",
    "sandbox":{
        "id":23,
        "createdBy":{
            "id":17,
            "createdTimestamp":null,
            "email":"hspc demo",
            "sbmUserId":"hspc demo",
            "name":"HSPC Demo",
            "hasAcceptedLatestTermsOfUse":null
        },
        "createdTimestamp":null,
        "visibility":"PRIVATE",
        "sandboxId":"hspcdemo",
        "name":"HSPC Demo Sandbox",
        "description":"HSPC Demo Sandbox",
        "apiEndpointIndex":"1",
        "fhirServerEndPoint":null,
        "allowOpenAccess":true
    },
    "launchUri": "https://bilirubin-risk-chart.hspconsortium.org/launch.html",
    "appManifestUri":null,
    "softwareId":null,
    "fhirVersions":null,
    "logoUri":null,
    "authClient":{
        "id":1,
        "clientName": "Bilirubin Chart",
        "clientId": "bilirubin_chart",
        "redirectUri": "https://bilirubin-risk-chart.hspconsortium.org/index.html",
        "logoUri": "https://content.hspconsortium.org/images/bilirubin/logo/bilirubin.png",
        "authDatabaseId":null
    },
    "samplePatients":null,
    "clientJSON":null,
    "info":null,
    "briefDescription":null,
    "author":null
}


class AppMenu extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedItem: 0,
            items: [],
            token: props.bearer,
        };
    }

    updateMenu(i){
        this.setState({selectedItem: i});
        var app = this.state.apps.filter(function (app) {
            if(app.id === i){
                return app;
            }
        });
        this.props.handleAppMenu(app);

    }

    componentWillMount(){
        let token = this.state.token;
        let url = 'https://' + this.props.sandboxApi + '/app?sandboxId=' + this.props.sandboxId;
        if(this.props.sandboxApi.includes("localhost")){
            url = 'http://' + this.props.sandboxApi + '/app?sandboxId=' + this.props.sandboxId;
        }
        // let token = this.props.bearer;
        // let url = 'https://' + this.props.sandboxApi + '/app?sandboxId=' + this.props.sandboxId;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        })
            .then( response => response.json() )
            .then( (responseData) => {
                const listItems = responseData.map((d) => <MenuItem key={d.id} primaryText={d.authClient.clientName} value={d.id} onClick={()=>this.updateMenu(d.id)}/>);
                listItems.push(<MenuItem key={1} primaryText="Bilirubin Chart" value={1} onClick={()=>this.updateMenu(1)}/>);
                this.setState({items: listItems});
                //Add Bilirubin app to list
                responseData.push(biliApp);
                this.setState({apps: responseData});
            })
    }

    render(){

        return(
            <Menu
                // selectedMenuItemStyle={ {backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF'} }
                value={this.state.selectedItem}>
                {this.state.items}
            </Menu>
        )
    }
}

export default AppMenu;


