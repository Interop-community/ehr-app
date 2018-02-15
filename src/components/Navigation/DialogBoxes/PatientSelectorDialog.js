import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PatientTableTwo from "../../Patient/PatientTableTwo";
import SearchIcon from 'react-icons/lib/md/search'



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
            };
        }else{
            this.state = {
                open: true,
                selectedPatient: null,
                selectedPatientName: "Select Patient",
                title: "Select a Patient",
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

    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,

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
                        handleSelectedPatient={this.handleSelectedPatient}
                        sandboxId={this.props.sandboxId}
                        sandboxApi={this.props.sandboxApi}
                        bearer={this.props.bearer}
                    />
                </Dialog>
            </div>
        );
    }
}