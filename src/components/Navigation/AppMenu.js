import React, { Component } from 'react';
import { Menu, MenuItem } from "material-ui";

import "./AppMenu.css";

const MENU_ITEM_STYLE = { height: "50px", overflow: "hidden", width: '223px', color: 'rgb(117, 117, 117)' };
const INNER_DIV_STYLE = { width: "224px", overflow: "hidden", boxSizing: "border-box" };
const PRIMARY_TEXT_STYLE = { display: "inline-block", width: "224px", overflow: "hidden", textOverflow: "ellipsis" };

class AppMenu extends Component {
    constructor (props) {
        super(props);
        this.state = {
            items: [],
            token: props.bearer,
        };
    }

    componentDidMount () {
        const listItems = this.props.apps.map((d) =>
            <MenuItem key={d.id} primaryText={<span style={PRIMARY_TEXT_STYLE}>{d.clientName}</span>} style={MENU_ITEM_STYLE}
                      value={d.id} onClick={() => this.updateMenu(d.id)} innerDivStyle={INNER_DIV_STYLE} className='app-menu-item' />);
        this.setState({ items: listItems });
    }

    updateMenu (i) {
        let app = this.props.apps.find(app => app.id === i);
        this.props.handleAppMenu(app);
    }

    render () {
        let menuStyles = { backgroundColor: 'white', height: '100%', borderRight: '1px solid lightgray', position: 'relative' };

        return <Menu value={this.props.selectedItem} style={menuStyles} autoWidth={false} selectedMenuItemStyle={{color: 'rgb(0,87,120)'}}>
                {this.props.patient && this.state.items}
            </Menu>;
    }
}

export default AppMenu;


