import React, {Component} from 'react';
import {
    TableBody,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';


/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
export default class PersonaTableRows extends Component {
    state = {
        stripedRows: false,
        showRowHover: false,
        selectable: true,
        multiSelectable: false,
        enableSelectAll: false,
        deselectOnClickaway: true,
        showCheckboxes: true,
        height: '300px',
        personaItems: [],
        items: [],
    };

    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };

    handleChange = (event) => {
        this.setState({height: event.target.value});
    };

    componentWillMount(){
        let token = 'eyJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJzYW5kX21hbiIsImlzcyI6Imh0dHBzOlwvXC9hdXRoLmhzcGNvbnNvcnRpdW0ub3JnXC8iLCJleHAiOjE1MTY4OTI3OTUsImlhdCI6MTUxNjgwNjM5NSwianRpIjoiYWRjNzIwYjYtOWU2MC00NWVlLTgyODctOGMxNTc4ZGI3NzNjIn0.BW8GTlpfUazXUfg_fLrZaopNUQgt8sDZgWaeExRU0MPclXTFTAw-XLUfUYZubBOavdIwVDrGpq3-DxFYSYptsMnalx_Htf4ESwCUJZgTGtwLSfHBbgbmwGWJ8sgEyyiIN-tfQeNT1EtjzTYS0AFhlfUePLOVebAuSbFT7zdyffw6Snb3hc86mePd1lgSmDCPBZ_11k8WseMxKCnYohROk2lQXuXIUiuTQE1dxtxZ1PPrCzxdVaAu8cR3Z9Qy3BUx2XOYZ-p4Bs7Z4zpfemoADI3nJklQ5s3__E9sDefzGr43btgbDwFZgSOkOj67B1nUO_AKq878DXsLIvqvXVfggg';
        let url = 'https://sandbox-api.hspconsortium.org/userPersona?sandboxId=hspcdemo'

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        })
            .then( response => response.json() )
            .then((responseData) => {
                const listItems = responseData.map((d) =>
                    <TableRow key={d.id}>
                        <TableRowColumn>{d.personaName}</TableRowColumn>
                        <TableRowColumn>{d.personalUserId}</TableRowColumn>
                        <TableRowColumn>{d.resourceUrl}</TableRowColumn>
                    </TableRow>
                );
                this.setState({personaItems: listItems});

            })

    }

    render() {
        return (
            <TableBody
                displayRowCheckbox={this.state.showCheckboxes}
                deselectOnClickaway={this.state.deselectOnClickaway}
                showRowHover={this.state.showRowHover}
                stripedRows={this.state.stripedRows}
            >
                {this.state.personaItems}
            </TableBody>

        );
    }
}