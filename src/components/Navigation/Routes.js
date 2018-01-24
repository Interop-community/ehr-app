import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import PatientSelectorDialog from "./DialogBoxes/PatientSelectorDialog";
import PersonaSelectorDialog from "./DialogBoxes/PersonaSelectorDialog";
import HeaderBar from "./Header/HeaderBar";



export default class Routes extends React.Component{
    constructor(props){
        super(props);
    }

    updateDialogOpen(){
        this.props.open = true;
    }

    render(){
        return(
            <div>
                <HeaderBar/>
                <Router>
                    <div>
                        <hr/>
                        <Route path="/launch"
                               render={() => {
                                   return <PersonaSelectorDialog/>
                               }}
                        />
                        <Route path="/Patient"
                               render={() => {
                                   return <PatientSelectorDialog/>
                               }}
                        />
                    </div>
                </Router>
            </div>
        )
    }

}