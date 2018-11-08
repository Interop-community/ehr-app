import React from "react";
import './style.css';

export default class MainGreeting extends React.Component {

    componentDidMount() {

    }

    render () {
        return <div className='loading-screen'>
                <span>
                    Loading data, please wait...
                </span>
        </div>;
    }
}
