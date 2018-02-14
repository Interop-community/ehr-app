import React, { PureComponent } from "react"
import Iframe from 'react-iframe'
import {Paper} from "material-ui";
import Demo from "./Demo/Demo";

class ShowApp extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            url: "https://cardiac-risk-app.hspconsortium.org/launch.html?iss=https://api.hspconsortium.org/hspcdemo/data&launch=PLy44n",
        };
    }

    render() {

        return (
            <Iframe
                url={this.props.url}
                // url="https://gallery.hspconsortium.org"
                id="myId"
                className="myClassname"
                width="1280px"
                // display="initial"
                // position="relative"
                // padding-left="200px"
                allowFullScreen
            />
        )
    }
}

export default ShowApp;