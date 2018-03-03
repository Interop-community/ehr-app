import React, {Component} from 'react';
import {Menu, MenuItem} from "material-ui";

class AppMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            token: props.bearer,
        };
    }

    componentDidMount() {
        const listItems = this.props.apps.map((d) => <MenuItem key={d.id} primaryText={d.authClient.clientName} value={d.id} onClick={() => this.updateMenu(d.id)}/>);
        this.setState({items: listItems});
    }

    updateMenu(i) {
        let app = this.props.apps.find(app => app.id === i);
        this.props.handleAppMenu(app);
    }

    render() {
        return <Menu value={this.props.selectedItem}>
            {this.props.patient && this.state.items}
        </Menu>;
    }
}

export default AppMenu;


