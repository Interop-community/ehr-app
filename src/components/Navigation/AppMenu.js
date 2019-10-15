import React, {Component} from 'react';
import {List, ListItem} from "@material-ui/core";
import WEB_ASSET from '@material-ui/icons/WebAsset';

import "./AppMenu.css";

const MENU_ITEM_STYLE = {height: "50px", overflow: "hidden", width: '223px', color: 'rgb(117, 117, 117)'};
const INNER_DIV_STYLE = {width: "224px", overflow: "hidden", boxSizing: "border-box", paddingLeft: '50px'};
const PRIMARY_TEXT_STYLE = {display: "inline-block", width: "224px", overflow: "hidden", textOverflow: "ellipsis"};

class AppMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            token: props.bearer,
        };
    }

    componentDidMount() {
        const listItems = this.props.apps.map((d) =>
            <ListItem key={d.id} style={MENU_ITEM_STYLE} value={d.id} onClick={() => this.updateMenu(d.id)} className='app-menu-item' button>
                <WEB_ASSET/> <span style={PRIMARY_TEXT_STYLE}>{d.clientName}</span>
            </ListItem>);
        this.setState({items: listItems});
    }

    updateMenu(i) {
        let app = this.props.apps.find(app => app.id === i);
        this.props.handleAppMenu(app);
    }

    render() {
        let menuStyles = {backgroundColor: 'white', minHeight: 'calc(100% - 16px)', borderRight: '1px solid lightgray', position: 'relative'};

        return <List value={this.props.selectedItem} style={menuStyles}>
            {this.props.patient && this.state.items}
        </List>;
    }
}

export default AppMenu;


