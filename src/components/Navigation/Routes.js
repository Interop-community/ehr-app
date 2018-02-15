import React from "react";
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import Home from "../Home";
import GuestGreeting from "../Greeting/GuestGreeting";
import MainGreeting from "../Greeting/MainGreeting";



export default class Routes extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Router>
                    <div>
                        <Route path="/launch/:sandboxId/:sandboxApi/:bearer"
                               component={Home}
                        />
                        <Route path="/"
                               render={()=><MainGreeting/>}
                        />
                    </div>
                </Router>
            </div>
        )
    }

}