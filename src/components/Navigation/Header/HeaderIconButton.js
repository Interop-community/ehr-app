import React, {Component} from 'react';
import {IconButton, IconMenu, MenuItem} from "material-ui";
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class HeaderIconButton extends Component {

    render() {
        return (
            <IconMenu
                iconButtonElement={
                    <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem primaryText="Doctor Name" />
                <MenuItem primaryText="Switch Persona" />
                <MenuItem primaryText="Sign out" />
            </IconMenu>
        );
    }
}

export default HeaderIconButton;