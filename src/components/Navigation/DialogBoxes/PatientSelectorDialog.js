import React from 'react';
import Dialog from 'material-ui/Dialog';
import PatientTableTwo from "../../Patient/PatientTableTwo";
import SearchIcon from 'react-icons/lib/md/search';
import Pagination from 'material-ui-pagination';
import {TableRow, TableRowColumn} from "material-ui";


/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class PatientSelectorDialog extends React.Component {
    constructor(props){
        super(props);
        if(props.show){
            this.state = {
                open: true,
                selectedPatient: null,
                selectedPatientName: "Select Patient",
                title: "Select a Patient",
                total: 1,
                display: 1,
                number: 1,
                get1stPageOfPatients: 'data?_getpages=5e4304f7-1a0a-4b9d-b29c-676eec0b38f7&_getpagesoffset=0&_count=50&_format=json&_pretty=true&_bundletype=searchset',
                get2stPageOfPatients: 'data?_getpages=5e4304f7-1a0a-4b9d-b29c-676eec0b38f7&_getpagesoffset=50&_count=50&_format=json&_pretty=true&_bundletype=searchset',
            };
        }else{
            this.state = {
                open: true,
                selectedPatient: null,
                selectedPatientName: "Select Patient",
                title: "Select a Patient",
                total: 1,
                display: 1,
                number: 1,
            };
        }

    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = (e) => {
        this.setState({open: false});
    };

    handleSelectedPatient = (doc) => {
        this.setState({selectedPatient: doc});
        this.setState({selectedPatientName: doc.resource.name[0].family});
        this.props.handlePatientSelection(doc);
        this.handleClose();

    };

    handlePageChange(pageNumber) {
        this.setState({number: pageNumber});
        var url = this.state.pageUrls[pageNumber-1];
        if(pageNumber===1){
            url = "https://" + this.props.refApi + "/" + this.props.sandboxId + "/data/Patient?_sort:asc=family&_sort:asc=given&name=&_count=50";
            if(this.props.refApi.includes("localhost")){
                url = "http://" + this.props.refApi + "/" + this.props.sandboxId + "/data/Patient?_sort:asc=family&_sort:asc=given&name=&_count=50";
            }
        }

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${this.props.bearer}`
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
                console.log(responseData);
            }).catch(function() {
            console.log("error");
        });
    };

    setupPagination = (results) => {
        var totalPages = results.total/50;
        totalPages = Math.ceil(totalPages);
        this.setState({total: totalPages});
        this.setState({display: totalPages});
        var pageUrls = [];
        for (var i = 0; i < results.link.length; i++) {
            pageUrls[i] = results.link[i].url
        }
        this.setState({pageUrls: pageUrls})
    };

    componentWillMount(){
        // let token = 'eyJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJzYW5kX21hbiIsImlzcyI6Imh0dHBzOlwvXC9hdXRoLmhzcGNvbnNvcnRpdW0ub3JnXC8iLCJleHAiOjE1MTY4OTI3OTUsImlhdCI6MTUxNjgwNjM5NSwianRpIjoiYWRjNzIwYjYtOWU2MC00NWVlLTgyODctOGMxNTc4ZGI3NzNjIn0.BW8GTlpfUazXUfg_fLrZaopNUQgt8sDZgWaeExRU0MPclXTFTAw-XLUfUYZubBOavdIwVDrGpq3-DxFYSYptsMnalx_Htf4ESwCUJZgTGtwLSfHBbgbmwGWJ8sgEyyiIN-tfQeNT1EtjzTYS0AFhlfUePLOVebAuSbFT7zdyffw6Snb3hc86mePd1lgSmDCPBZ_11k8WseMxKCnYohROk2lQXuXIUiuTQE1dxtxZ1PPrCzxdVaAu8cR3Z9Qy3BUx2XOYZ-p4Bs7Z4zpfemoADI3nJklQ5s3__E9sDefzGr43btgbDwFZgSOkOj67B1nUO_AKq878DXsLIvqvXVfggg';
        // let url = 'https://api.hspconsortium.org/hspcdemo/data/Patient?_sort:asc=family&_sort:asc=given&name=&_count=5';
        let token = this.props.bearer;
        let url = "https://" + this.props.refApi + "/" + this.props.sandboxId + "/data/Patient?_sort:asc=family&_sort:asc=given&name=&_count=50";
        if(this.props.refApi.includes("localhost")){
            url = "http://" + this.props.refApi + "/" + this.props.sandboxId + "/data/Patient?_sort:asc=family&_sort:asc=given&name=&_count=50";
        }


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
                this.setupPagination(responseData);
            }).catch(function() {
            console.log("error");
        });

    }

    render() {
        const actions = [
            <Pagination
                total = { this.state.total }
                current = { this.state.number }
                display = { this.state.display }
                onChange = { number => this.handlePageChange(number) }
            />

        ];

        const patientPickerStyle = {
            float: 'right',
            padding: '18px 5px 5px 5px',
            cursor: 'pointer',
            fontSize: '20px'
        };

        const searchIconStyle = {
            height: '40px',
            width: '40px',
            paddingBottom: '10px',
            paddingLeft: '3px',
            paddingRight: '10px'
        }

        return (
            <div>
                <div style={patientPickerStyle} onClick={this.handleOpen}>Select Patient<SearchIcon style={searchIconStyle} /></div>
                <Dialog
                    title={this.state.title}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <PatientTableTwo
                        setupPagination={this.setupPagination}
                        refApi={this.props.refApi}
                        handleSelectedPatient={this.handleSelectedPatient}
                        sandboxId={this.props.sandboxId}
                        sandboxApi={this.props.sandboxApi}
                        bearer={this.props.bearer}
                        items={this.state.items}
                        patientArray={this.state.patientArray}
                    />
                </Dialog>
            </div>
        );
    }
}