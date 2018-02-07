import React, { PureComponent } from "react"
import Iframe from 'react-iframe'

class Demo extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            url: "https://bilirubin-risk-chart-test.hspconsortium.org/launch.html?iss=https%3A%2F%2Fapi-stu3-test.hspconsortium.org%2FReallyLongNameTest%2Fdata&launch=Ykn9he",
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