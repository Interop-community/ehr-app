import React, {Component} from 'react';
import {Menu, MenuItem} from "material-ui";


class AppMenu extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedItem: 1,
            items: []
        };
    }

    updateMenu(i){
        this.setState({selectedItem: i});

    }

    componentWillMount(){
        let token = 'eyJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJzYW5kX21hbiIsImlzcyI6Imh0dHBzOlwvXC9hdXRoLmhzcGNvbnNvcnRpdW0ub3JnXC8iLCJleHAiOjE1MTY4OTI3OTUsImlhdCI6MTUxNjgwNjM5NSwianRpIjoiYWRjNzIwYjYtOWU2MC00NWVlLTgyODctOGMxNTc4ZGI3NzNjIn0.BW8GTlpfUazXUfg_fLrZaopNUQgt8sDZgWaeExRU0MPclXTFTAw-XLUfUYZubBOavdIwVDrGpq3-DxFYSYptsMnalx_Htf4ESwCUJZgTGtwLSfHBbgbmwGWJ8sgEyyiIN-tfQeNT1EtjzTYS0AFhlfUePLOVebAuSbFT7zdyffw6Snb3hc86mePd1lgSmDCPBZ_11k8WseMxKCnYohROk2lQXuXIUiuTQE1dxtxZ1PPrCzxdVaAu8cR3Z9Qy3BUx2XOYZ-p4Bs7Z4zpfemoADI3nJklQ5s3__E9sDefzGr43btgbDwFZgSOkOj67B1nUO_AKq878DXsLIvqvXVfggg';
        let url = 'https://sandbox-api.hspconsortium.org/app?sandboxId=hspcdemo'

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        })
            .then( response => response.json() )
            .then( (responseData) => {
                const listItems = responseData.map((d) => <MenuItem key={d.id} primaryText={d.authClient.clientName} value={d.id} onClick={()=>this.updateMenu(d.id)}/>);
                listItems.push(<MenuItem primaryText="Bilirubin Chart" value={1} onClick={()=>this.updateMenu(1)}/>);
                listItems.push(<MenuItem primaryText="My Web App" value={2} onClick={()=>this.updateMenu(2)}/>);
                listItems.push(<MenuItem primaryText="CDS Hooks Sandbox" value={3} onClick={()=>this.updateMenu(3)}/>);
                this.setState({items: listItems});
            })
    }

    render(){
        return(
            <Menu
                selectedMenuItemStyle={ {backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF'} }
                value={this.state.selectedItem}>

                {this.state.items}

            </Menu>
        )
    }
}

export default AppMenu;