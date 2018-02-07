import React, {Component} from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

export default class PatientTable extends Component {
    state = {
        selected: [1],
    };

    isSelected = (d) => {
        return this.state.selected.indexOf(d.resource.id);
    };

    handleRowSelection = (selectedRows) => {
        this.setState({
            selected: selectedRows,
        });
    };

    componentWillMount(){
        let token = 'eyJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJzYW5kX21hbiIsImlzcyI6Imh0dHBzOlwvXC9hdXRoLmhzcGNvbnNvcnRpdW0ub3JnXC8iLCJleHAiOjE1MTc2OTcxMDQsImlhdCI6MTUxNzYxMDcwNCwianRpIjoiZjc3Y2UxOTktZTU1Ny00N2Q5LWFiMmEtYWIzNzBhZWE1ZjRmIn0.fG6JVz5NVle0Y5hxsc5wSn6dA5mCbCnoF56NEIhFMiMtgnYGmBd_u2MMDJ780igLr9tgycZMAo3OaDCJvL_jZJ2TdAdOsZ3oENiZj00_08X8gR5BZj3CJHa0LJcmcsrkVvo5hx_amO3cUip_t4VvXdOP71iQ8EBARe48umi29EyDsMdCD8bDWwF1BiihQ5bxZp2R1Tec9efrK7PdRuixHvlyULlFbTsq0vbWhVh31KtLqtczARv9eiblL6DmV1BJ9qwl8DQbARvREdUm3mtzoSgqfcKQcC6ThTd32Fnx2sHfLSDor-Byir8Lfn7opVTBIta1JcyY7ToiGegixtD0oQ';
        let url = 'https://api.hspconsortium.org/hspcdemo/data/Patient?_sort:asc=family&_sort:asc=given&name=&_count=5'

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
                    <TableRow key={d.resource.id} selected={this.isSelected(d)}>
                        <TableRowColumn>{d.resource.name[0].family}</TableRowColumn>
                        <TableRowColumn>{d.resource.birthDate}</TableRowColumn>
                        <TableRowColumn>{d.resource.gender}</TableRowColumn>
                    </TableRow>
                );
                this.setState({items: listItems});
            })

    }

    render() {
        return (
            <Table onRowSelection={this.handleRowSelection}>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Birth Date</TableHeaderColumn>
                        <TableHeaderColumn>Gender</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {this.state.items}
                </TableBody>
            </Table>
        );
    }
}