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

    fetching = false;
    isListening = false;

    constructor(props) {
        super(props);

        this.state = {
            selectedPatient: null,
            selectedPatientName: STRINGS.selectedPatientName,
            total: 1,
            display: 1,
            number: 1,
            nameFilter: "",
            patientArray: []
        };
    }

    componentDidMount() {
        this.search();
    }

    componentDidUpdate() {
        setTimeout(() => {
            if (this.props.open && !this.isListening) {
                let element = document.getElementsByClassName('scroll-wrapper')[0];
                !!element && element.addEventListener('scroll', this.scroll);
                this.isListening = true;
            } else if (!this.props.open && this.isListening) {
                let element = document.getElementsByClassName('scroll-wrapper')[0];
                !!element && element.removeEventListener('scroll', this.scroll);
                this.isListening = false;
            }
        }, 700);
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
                <TextField label={STRINGS.nameFilter} onChange={e => this.search(e.target.value)}/>
                <div className='scroll-wrapper'>
                    <Table className='patients-table'>
                        <TableHead style={{backgroundColor: this.props.theme.p5}}>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Birth Date</TableCell>
                                <TableCell>Gender</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody role='checkbox'>
                            {this.state.patientArray.map(d =>
                                <TableRow key={d.resource.id} className="patient-table-row" onClick={() => this.handleSelectedPatient(d)} hover>
                                    <TableCell>{getPatientName(d.resource)}</TableCell>
                                    <TableCell>{(moment(d.resource.birthDate)).format("DD MMM YYYY")}</TableCell>
                                    <TableCell>{d.resource.gender}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </Dialog>
    }

    scroll = () => {
        let stage = document.getElementsByClassName('scroll-wrapper')[0];
        let dif = stage.scrollHeight - stage.scrollTop - stage.offsetHeight;

        let shouldFetch = dif <= 50;
        if (shouldFetch && !this.fetching) {
            this.fetching = true;
            console.log('fetching!');
            fetch(this.state.nextPageUrl, {method: 'GET', headers: {'Content-Type': 'application/json;charset=UTF-8', 'Authorization': `Bearer ${this.props.bearer}`}})
                .then(response => response.json())
                .then((responseData) => {
                    this.setState({patientArray: this.state.patientArray.concat(responseData.entry)});
                    this.setupPagination(responseData);
                    this.fetching = false;
                })
                .catch(e => {
                    this.fetching = true;
                    console.log(e);
                    this.setState({items: []})
                });
        }
    };

    search = (nameFilter = this.state.nameFilter) => {
        let token = this.props.bearer;
        window.fhirToken = token;
        let url;
        if (nameFilter !== '') {
            url = ` /data/Patient?name:contains=${nameFilter}&_sort:asc=family&_sort:asc=given&_count=20`;
        } else {
            url = `${window.location.protocol}//${this.props.refApi}/${this.props.sandboxId}/data/Patient?_sort:asc=family&_sort:asc=given&_count=20`;
        }


        fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json;charset=UTF-8', 'Authorization': `Bearer ${token}`}})
            .then(response => response.json())
            .then((responseData) => {
                this.setState({patientArray: responseData.entry || []});
                this.setupPagination(responseData);
            })
            .catch(e => {
                console.log(e);
                this.setState({items: []})
            });
    };

    setupPagination = (results) => {
        let nextPageUrl = results.link.find(i => i.relation === 'next');
        nextPageUrl = nextPageUrl ? nextPageUrl.url : null;
        this.setState({nextPageUrl})
    };

    toggle = () => {
        this.props.onClose && this.props.onClose();
    };

    handleSelectedPatient = (doc) => {
        this.setState({selectedPatient: doc});
        this.setState({selectedPatientName: doc.resource.name[0].family});
        this.props.handlePatientSelection(doc);
        this.toggle();

    };
}

export default withTheme(PatientSelectorDialog);