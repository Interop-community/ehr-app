import React, { PureComponent } from "react"
import Iframe from 'react-iframe'

class Demo extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            bearer: "eyJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJzYW5kX21hbiIsImlzcyI6Imh0dHBzOlwvXC9hdXRoLmhzcGNvbnNvcnRpdW0ub3JnXC8iLCJleHAiOjE1MTg1Mzc4NzIsImlhdCI6MTUxODQ1MTQ3MiwianRpIjoiMmZiMWE4Y2EtNDA3ZC00ZmYyLTk4ZGUtZWMyYzY0YTU2OWRlIn0.Bn98VBxdeq-7CvUd7742mFdqCtxUPb7U4P-tV_4VZyfo7VZSsT2KnyGV3gGz8YnGOwrBBYiu4dzMOcBgzasnK0Sbkq-7mGkRqkfVE6eCePS49rOh65R0sJt8MYqQpw-Lo6fSssOpXUSOIHrxCg2TECn6KFA5pYPyNiJU7pz-Wg2AaPoNZKuEVe68VWNhNDX9PA3qCzyOjP9Mz26vtazxc0RJAvdimaTGGMWJjMBLMpMWIUZI4M7wq3NNH4Y0GFq83UO1aXC_casEoxc8EkXGMzZSOldBm7zkNAbQx65D0dmB6rcwQyGvCmbOMySpqpPeJ4LvluUkWAK3uTr0o6SlqQ",
            sandboxApi: this.props.sandboxApi,
            sandboxId: this.props.sandboxId,
            launchId: null,
            refApi: null,
            appLaunchUrl: null,
            getLaunchCodeUrl: "https://api.hspconsortium.org/hspcdemo/data/_services/smart/Launch",
            url: "https://bilirubin-risk-chart.hspconsortium.org/launch.html?iss=https://api.hspconsortium.org/hspcdemo/data&launch=xUVNZB",
        };
    }

    getLaunchCode(){
        fetch(this.state.getLaunchCodeUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${this.state.bearer}`
            },
            body: JSON.stringify({"client_id":"bilirubin_chart","parameters":{"patient":"SMART-1288992","need_patient_banner":false}})
        })
            .then( response => response.json() )
            .then((responseData) => {
                console.log("Response data");
                console.log(responseData);
                this.setState({url: "https://bilirubin-risk-chart.hspconsortium.org/launch.html?iss=https://api.hspconsortium.org/" + this.props.sandboxId + "/data&launch=" + responseData.launch_id});
            })
    }

    setAppProps = () => {
        if(this.props.currentApp != null || this.props.currentApp != undefined){
            this.setState({launchUri: this.props.currentApp[0].launchUri});
            this.setState({clientId: this.props.currentApp[0].authClient.clientName});
            this.setState({currentApp: this.props.currentApp});
            this.setState({currentApp: this.props.currentApp});
            this.setState({currentApp: this.props.currentApp});

            //make json obj
            var text = '{ "client_id":' + this.state.clientId + '","parameters":{"patient":"SMART-1288992","need_patient_banner":false}}';
            var obj = JSON.parse(text);

            console.log("json body");
            console.log(obj);
        }
    }

    componentWillMount(){
        this.getLaunchCode();
        this.setAppProps();
    }

    render() {
        return (
            <Iframe
                url={this.state.url}
                // url="https://gallery.hspconsortium.org"
                id="myId"
                className="myClassname"
                // display="initial"
                // position="relative"
                // padding-left="200px"
                allowFullScreen
            />
        )
    }
}

export default Demo;