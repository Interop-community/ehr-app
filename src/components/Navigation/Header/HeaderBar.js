import React, {Component} from 'react';
import {AppBar, Drawer, Paper} from "material-ui";
import Demo from "../../Demo/Demo";
import BottomNavigationSimple from "../BottomNavigation/BottomNavigationSimple";
import HeaderIconButton from "./HeaderIconButton";
import AppMenu from "../AppMenu";


const style = {
    paper: {
        display: 'inline-block',
        float: 'left',
        margin: '16px 32px 16px 0',
    },
    rightIcon: {
        textAlign: 'center',
        lineHeight: '24px',
    },
};

class HeaderBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selectedItem: 1,
            title: "Choose Patient",
        };

    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

    render() {
        return (
            <div>
                <AppBar onLeftIconButtonClick={this.handleToggle}
                        title={this.state.title}
                        iconElementRight={<HeaderIconButton/>}></AppBar>
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <Paper style={style.paper}>
                        <AppMenu/>
                    </Paper>
                </Drawer>
                <Demo />
                <BottomNavigationSimple/>
            </div>
        );
    }
}

export default HeaderBar;