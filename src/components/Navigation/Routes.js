import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from "../Home";

export default class Routes extends React.Component {
    render () {
        return <Router>
            <Switch>
                <Route path="/launch" component={Home}/>
                <Redirect from="/" to='/launch'/>
            </Switch>
        </Router>
    }

}
