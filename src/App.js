import React, { Component } from 'react';
import './App.css';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Routes from "./components/Navigation/Routes";

class App extends Component {
    constructor(props) {
        super(props);
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
