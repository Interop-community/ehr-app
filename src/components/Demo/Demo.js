import React, { PureComponent } from "react"
import Iframe from 'react-iframe'

class Demo extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            url: "http://bilirubin-risk-chart-test.hspconsortium.org/launch.html?iss=https://api-stu3-test.hspconsortium.org/ReallyLongNameTest/data&launch=mN9V0N",
        };
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