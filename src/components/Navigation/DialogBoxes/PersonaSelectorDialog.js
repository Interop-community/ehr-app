import React from 'react';
import {Button, Dialog, Table, TableBody, TableCell, TableHead, TableRow, withTheme} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import './PersonaSelectorDialog.css';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class PersonaSelectorDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bearer: props.bearer,
            sandboxApi: props.sandboxApi,
            sandboxId: props.sandboxId,
            selectDoc: null
        };
    }

    componentDidMount() {
        let token = this.state.bearer;
        let url = `${window.location.protocol}//${this.state.sandboxApi}/userPersona?sandboxId=${this.state.sandboxId}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then((responseData) => {
                var trimmedList = responseData.filter(function (rd) {
                    return (rd.resourceUrl.includes("Practitioner"));
                });
                const listItems = trimmedList.map((d) =>
                    <TableRow key={d.id} className="persona-table-row" onClick={() => this.handleSelectedDoc(d)} hover>
                        <TableCell>{d.personaName}</TableCell>
                        <TableCell>{d.personaUserId}</TableCell>
                        <TableCell>{d.resourceUrl}</TableCell>
                    </TableRow>
                );
                this.setState({personaItems: listItems});
                this.setState({personaArray: trimmedList});

            })

    }

    render() {
        return <div>
            <Dialog title="Select A Practitioner Persona" open={this.props.open} onClose={() => this.props.onClose && this.props.onClose()} classes={{paper: 'persona-dialog'}}>
                <div className='selector-title'>
                    <span>Personas</span>
                    <Button className='close-button' onClick={() => this.props.onClose && this.props.onClose()}>
                        <CloseIcon/>
                    </Button>
                </div>
                <div className='personas-wrapper'>
                    <div>
                        <Table className='personas-table'>
                            <TableHead style={{backgroundColor: this.props.theme.p5}}>
                                <TableRow>
                                    <TableCell tooltip="Display Name">Display Name</TableCell>
                                    <TableCell tooltip="User Id">User Id</TableCell>
                                    <TableCell tooltip="FHIR Resource">FHIR Resource</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody role='checkbox'>
                                {this.state.personaItems}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </Dialog>
        </div>;
    }

    handleSelectedDoc = (doc) => {
        this.setState({selectedDoc: doc});
        this.props.handlePersonaSelection(doc);
        this.props.onClose && this.props.onClose();
    };
}

export default withTheme(PersonaSelectorDialog);