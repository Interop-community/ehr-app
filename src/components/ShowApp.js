import React, { PureComponent } from "react"
import Iframe from 'react-iframe'

class ShowApp extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            url: "",
        };
    }

    render() {

        return (
            <Iframe
                url={this.props.url != null? this.props.url:this.state.url}
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