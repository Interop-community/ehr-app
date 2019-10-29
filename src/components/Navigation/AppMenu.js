import React, {Component} from 'react';
import {List, ListItem, Fab, Badge, Menu, MenuItem, Divider} from "@material-ui/core";
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
            menu: false,
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
        let menuStyles = {backgroundColor: 'rgb(245, 245, 245)', minHeight: 'calc(100% - 16px)', borderRight: '1px solid lightgray', position: 'relative'};
        let cards = this.props.cards || [];
        let disabled = !this.props.cards || !this.props.cards.length;

        console.log(this.props.cards);

        return <div style={{height: '100%', position: 'relative'}}>
            <List value={this.props.selectedItem} style={menuStyles}>
                {this.props.patient && this.state.items}
            </List>
            <Fab className='hooks-notifications-button' color='primary' disabled={disabled} onClick={this.toggleMenu}>
                <img src='./hook.png' style={{width: '23px', height: 'auto'}}/>
                <Badge badgeContent={cards.length} className={`badge${disabled ? ' hidden' : ''}`}/>
            </Fab>
            <Menu className='hooks-list' onClose={this.toggleMenu} open={this.state.menu} anchorEl={this.state.anchorEl} anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                {cards.map(card => [
                    <MenuItem className='hook-item' key={card.id}>
                        {card.summary}
                    </MenuItem>,
                    <Divider key={`${card.id}_d`}/>
                ])}
            </Menu>
        </div>;
    }

    toggleMenu = (e = {}) => {
        this.setState({menu: !this.state.menu, anchorEl: e.target})
    };
}

export default AppMenu;


