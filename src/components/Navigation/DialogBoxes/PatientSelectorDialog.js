import React from 'react';
import {Dialog, TableRow, TableCell, TextField, Button, Table, TableHead, TableBody, withTheme} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import moment from "moment";

import {getPatientName} from "../../../utils";

import './PatientSelectorDialog.css';

const STRINGS = {
    selectedPatientName: "Select Patient",
    title: "Select a Patient",
    nameFilter: "Filter by name"
};

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class PatientSelectorDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPatient: null,
            selectedPatientName: STRINGS.selectedPatientName,
            total: 1,
            display: 1,
            number: 1,
            nameFilter: ""
        };
    }

    componentDidMount() {
        this.search();
    }

    render() {
        return <Dialog title={STRINGS.title} open={this.props.open} onClose={this.toggle} classes={{paper: 'patient-dialog'}}>
            <div className='selector-title'>
                <span>Patients</span>
                <Button className='close-button' onClick={this.toggle}>
                    <CloseIcon/>
                </Button>
            </div>
            <div className='patients-wrapper'>
                <TextField label={STRINGS.nameFilter} onChange={(_e, nameFilter) => this.setState({nameFilter}, this.search.bind(this))}/>
                <div>
                    <Table className='patients-table'>
                        <TableHead style={{backgroundColor: this.props.theme.p5}}>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Birth Date</TableCell>
                                <TableCell>Gender</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody role='checkbox'>
                            {this.state.items}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </Dialog>
    }

    search(nameFilter = this.state.nameFilter) {
        let token = this.props.bearer;
        let url;
        if (nameFilter !== '') {
            url = `${window.location.protocol}//${this.props.refApi}/${this.props.sandboxId}/data/Patient?_sort:asc=family&_sort:asc=given&name=${nameFilter}&_count=50`;
        } else {
            url = `${window.location.protocol}//${this.props.refApi}/${this.props.sandboxId}/data/Patient?_sort:asc=family&_sort:asc=given&_count=50`;
        }


        fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json;charset=UTF-8', 'Authorization': `Bearer ${token}`}})
            .then(response => response.json())
            .then((responseData) => {
                const listItems = responseData.entry.map(d =>
                    <TableRow key={d.resource.id} className="patient-table-row" onClick={() => this.handleSelectedPatient(d)} hover>
                        <TableCell>{getPatientName(d.resource)}</TableCell>
                        <TableCell>{(moment(d.resource.birthDate)).format("DD MMM YYYY")}</TableCell>
                        <TableCell>{d.resource.gender}</TableCell>
                    </TableRow>
                );
                this.setState({items: listItems});
                this.setState({patientArray: responseData});
                this.setupPagination(responseData);
            })
            .catch(e => {
                console.log(e);
                this.setState({items: []})
            });
    }

    toggle = () => {
        this.props.onClose && this.props.onClose();
    };

    handleSelectedPatient = (doc) => {
        this.setState({selectedPatient: doc});
        this.setState({selectedPatientName: doc.resource.name[0].family});
        this.props.handlePatientSelection(doc);
        this.toggle();

    };

    handlePageChange(pageNumber) {
        this.setState({number: pageNumber});
        let url = this.state.pageUrls[pageNumber - 1];
        if (pageNumber === 1) {
            url = `${window.location.protocol}//${this.props.refApi}/${this.props.sandboxId}/data/Patient?_sort:asc=family&_sort:asc=given&_count=50`;
        }

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${this.props.bearer}`
            }
        })
            .then(response => response.json())
            .then((responseData) => {
                const listItems = responseData.entry.map((d) =>
                    <TableRow key={d.resource.id}>
                        <TableCell>{d.resource.name[0].family}</TableCell>
                        <TableCell>{d.resource.birthDate}</TableCell>
                        <TableCell>{d.resource.gender}</TableCell>
                    </TableRow>
                );
                this.setState({items: listItems});
                this.setState({patientArray: responseData});
            }).catch(function () {
            console.log("error");
        });
    };

    setupPagination = (results) => {
        let totalPages = results.total / 50;
        totalPages = Math.ceil(totalPages);
        this.setState({total: totalPages});
        this.setState({display: totalPages});
        let pageUrls = [];
        for (let i = 0; i < results.link.length; i++) {
            pageUrls[i] = results.link[i].url
        }
        this.setState({pageUrls: pageUrls})
    };
}

export default withTheme(PatientSelectorDialog);