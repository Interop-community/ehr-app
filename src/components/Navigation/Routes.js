import React from "react";
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import PatientSelectorDialog from "./DialogBoxes/PatientSelectorDialog";
import PersonaSelectorDialog from "./DialogBoxes/PersonaSelectorDialog";
import Home from "../Home";
import Demo from "../Demo/Demo";



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
                        <Route path="/demo"
                               component={Demo}
                        />
                    </div>
                </Router>
            </div>
        )
    }

}