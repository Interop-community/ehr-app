import React, {Component} from 'react';
import {AppBar, Drawer, Menu, MenuItem, Paper, Toolbar} from "material-ui";
import Demo from "../../Demo/Demo";
import BottomNavigationSimple from "../BottomNavigation/BottomNavigationSimple";
import BpIcon from "../../Icons/BpIcon";
import BabyGrowthIcon from "../../Icons/BabyGrowthIcon";
import HeaderIconButton from "./HeaderIconButton";
import {ContentLink, NavigationArrowUpward} from "material-ui/svg-icons/index";
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
        this.state = {open: false,
            selectedItem: 1};

    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

    render() {
        return (
            <div>
                <AppBar onLeftIconButtonClick={this.handleToggle}
                        title="User Persona"
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