import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class DrawerSimple extends Component {


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Drawer open={this.props.open}>
                    <MenuItem>App One</MenuItem>
                    <MenuItem>App Two</MenuItem>
                </Drawer>
            </div>
        );
    }
}

export default DrawerSimple;