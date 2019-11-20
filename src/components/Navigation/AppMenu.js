import React, {Component, Fragment} from 'react';
import {List, ListItem, Fab, Badge, Menu, MenuItem, Divider, Dialog, Paper, IconButton} from "@material-ui/core";
import {ArrowRight} from '@material-ui/icons';
import ReactMarkdown from "react-markdown";
import WEB_ASSET from '@material-ui/icons/WebAsset';

import "./AppMenu.css";

const MENU_ITEM_STYLE = {height: "50px", overflow: "hidden", width: '223px', color: 'rgb(117, 117, 117)'};
const INNER_DIV_STYLE = {width: "224px", overflow: "hidden", boxSizing: "border-box", paddingLeft: '50px'};
const PRIMARY_TEXT_STYLE = {display: "inline-block", width: "224px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: 'nowrap'};

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

        return <div style={{height: '100%', position: 'relative'}}>

            <Dialog open={!!this.state.selectedCard} classes={{paper: 'hooks-dialog'}} onClose={() => this.select()}>
                <Paper className='paper-card'>
                    <IconButton className="close-button" onClick={() => this.select()}>
                        +
                    </IconButton>
                    <h3>CDS Service response</h3>
                    <div className='paper-body'>
                            <div className={'hooks-wrapper parsed tab active'}>
                                <a ref='openLink' target='_blank'/>
                                {!!this.state.selectedCard && this.getCards([this.state.selectedCard])}
                            </div>
                    </div>
                </Paper>
            </Dialog>

            <List value={this.props.selectedItem} style={menuStyles}>
                {this.props.patient && this.state.items}
            </List>
            <Fab className='hooks-notifications-button' color='primary' disabled={disabled} onClick={this.toggleMenu}>
                <img src='./hook.png' style={{width: '23px', height: 'auto'}}/>
                <Badge badgeContent={cards.length} className={`badge${disabled ? ' hidden' : ''}`}/>
            </Fab>
            <Menu className='hooks-list' onClose={this.toggleMenu} open={this.state.menu} anchorEl={this.state.anchorEl} anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                {cards.map(card => [
                    <MenuItem className='hook-item' key={card.id} onClick={() => this.select(card)} style={{position: 'relative', paddingRight: '45px'}}>
                        {card.summary} <ArrowRight style={{position: 'absolute', right: '5px', border: '1px solid darkgray'}} />
                    </MenuItem>,
                    <Divider key={`${card.id}_d`}/>
                ])}
                <MenuItem className='hook-item clear' onClick={this.clear}>
                    <span className='clear-button'>Clear notifications</span>
                </MenuItem>
            </Menu>
        </div>;
    }

    select = selectedCard => {
      this.setState({selectedCard})
    };

    getCards = (cards) => {
        return cards.map((card, i) => {
            return <div className={`hook-card-wrapper ${card.indicator}`} key={card.requestData.hookInstance + '_' + i}>
                <span className='card-summary'>{card.summary}</span>
                {card.source && <div className='hook-source-info'>
                    <span className='hook-source-title'>Source:</span>
                    <span className='hook-source'> {card.source.label}</span>
                </div>}
                {/*<div className='card-detail' dangerouslySetInnerHTML={{__html: card.detail}}/>*/}
                <div className='card-detail'>
                    <ReactMarkdown source={card.detail}/>
                </div>
                {card.suggestions && <div>
                    {card.suggestions.map((suggestion, i) => {
                        return <button key={i} className='hook-suggestion-button' onClick={() => this.executeSuggestion(suggestion)}>
                            <span>{suggestion.label}</span>
                        </button>
                    })}
                </div>}
                {card.links && <div className='links'>
                    {card.links.map((link, i) => {
                        if (link.type === 'smart') {
                            let appToLaunch = this.props.apps.find(app => app.launchUri === link.url);
                            let contextParams = link.appContext ? [{name: 'appContext', value: link.appContext}] : undefined;
                            let onClick = appToLaunch && card.requestData && card.requestData.context && card.requestData.context.patientId
                                ? () => this.props.doLaunch(appToLaunch, card.requestData.context.patientId, undefined, undefined, {contextParams, needPatientBanner: 'T'})
                                : null;

                            return <Fragment key={i}>
                                {!appToLaunch && <span className='app-warning'>App not registered!</span>}
                                <button disabled={!appToLaunch} className='hook-suggestion-button' onClick={onClick}>
                                    <span>{link.label}</span>
                                </button>
                            </Fragment>
                        } else {
                            return <button key={i} className='hook-suggestion-button' onClick={() => this.openLink(link.url)}>
                                <span>{link.label}</span>
                            </button>
                        }
                    })}
                </div>}
            </div>
        });
    };

    clear = () => {
        this.toggleMenu();
        this.props.clearNotifications();
    };

    toggleMenu = (e = {}) => {
        this.setState({menu: !this.state.menu, anchorEl: e.target})
    };
}

export default AppMenu;


