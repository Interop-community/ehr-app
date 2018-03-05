import React, {Component} from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
export default class PatientTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: true,
            selectable: false,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
            height: '300px',
        };
    }

    componentWillMount(){
        // let token = 'eyJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJzYW5kX21hbiIsImlzcyI6Imh0dHBzOlwvXC9hdXRoLmhzcGNvbnNvcnRpdW0ub3JnXC8iLCJleHAiOjE1MTY4OTI3OTUsImlhdCI6MTUxNjgwNjM5NSwianRpIjoiYWRjNzIwYjYtOWU2MC00NWVlLTgyODctOGMxNTc4ZGI3NzNjIn0.BW8GTlpfUazXUfg_fLrZaopNUQgt8sDZgWaeExRU0MPclXTFTAw-XLUfUYZubBOavdIwVDrGpq3-DxFYSYptsMnalx_Htf4ESwCUJZgTGtwLSfHBbgbmwGWJ8sgEyyiIN-tfQeNT1EtjzTYS0AFhlfUePLOVebAuSbFT7zdyffw6Snb3hc86mePd1lgSmDCPBZ_11k8WseMxKCnYohROk2lQXuXIUiuTQE1dxtxZ1PPrCzxdVaAu8cR3Z9Qy3BUx2XOYZ-p4Bs7Z4zpfemoADI3nJklQ5s3__E9sDefzGr43btgbDwFZgSOkOj67B1nUO_AKq878DXsLIvqvXVfggg';
        // let url = 'https://api.hspconsortium.org/hspcdemo/data/Patient?_sort:asc=family&_sort:asc=given&name=&_count=5';
        let token = this.props.bearer;
        let url = "https://api.hspconsortium.org/" + this.props.sandboxId + "/data/Patient?_sort:asc=family&_sort:asc=given&name=&_count=100";

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        })
            .then( response => response.json() )
            .then( (responseData) => {
                const listItems = responseData.entry.map((d) =>
                    <TableRow key={d.resource.id}>
                        <TableRowColumn>{d.resource.name[0].family}</TableRowColumn>
                        <TableRowColumn>{d.resource.birthDate}</TableRowColumn>
                        <TableRowColumn>{d.resource.gender}</TableRowColumn>
                    </TableRow>
                );
                this.setState({items: listItems});
                this.setState({patientArray: responseData});
            }).catch(function() {
            console.log("error");
        });

    }

    handleToggle = (selectedRow) => {
        this.props.handleSelectedPatient(this.state.patientArray.entry[selectedRow[0]]);
    };

    render() {
        return (
            <div>
                <Table
                    height={this.state.height}
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    onRowSelection={this.handleToggle}
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}

                    >
                        <TableRow>
                            <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Birth Date">Birth Date</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Status">Gender</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {this.state.items}
                    </TableBody>
                </Table>
            </div>
        );
    }
}
