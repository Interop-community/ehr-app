import React, { Component } from 'react';
import './App.css';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import Routes from "./components/Navigation/Routes";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleTouchMap() {
        this.setState({open: !this.state.open});
    }

  render() {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <Routes/>
        </MuiThemeProvider>
    );
  }
}

export default App;
