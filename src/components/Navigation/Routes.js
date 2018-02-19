import React from "react";
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import Home from "../Home";
import MainGreeting from "../Greeting/MainGreeting";



export default class Routes extends React.Component{

    render(){
        return(
            <div>
                <Router>
                    <div>
                        <Route path="/launch/:sandboxId/:sandboxApi/:refApi/:bearer"
                               component={Home}
                        />
                        <Route path="/"
                               component={MainGreeting}
                        />
                    </div>
                </Router>
            </div>
        )
    }

}