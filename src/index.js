import React from 'react';
import 'react-app-polyfill/stable';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'react-app-polyfill/ie11';
import "@babel/polyfill";

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
