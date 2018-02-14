import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PersonaTable from "../../Persona/PersonaTable";

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class PersonaSelectorDialog extends React.Component {
    constructor(props){
        super(props);
        if(props.show){
            this.state = {
                bearer: props.bearer,
                sandboxApi: props.sandboxApi,
                sandboxId: props.sandboxId,
                open: true,
                blah: "childpersonablah",
                selectDoc: null,
            }
        }else {
            this.state = {
                bearer: props.bearer,
                sandboxApi: props.sandboxApi,
                sandboxId: props.sandboxId,
                open: false,
                selectDoc: null,

            }
        }

    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSelectedDoc = (doc) => {
        this.setState({selectedDoc: doc});
        this.props.handlePersonaSelection(doc);
        this.handleClose();

    }

    render() {

        return (
            <div>
                <div onClick={this.handleOpen}>Select a Persona</div>
                <Dialog
                    title="Select A Practitioner Persona"
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <PersonaTable
                        handleSelectedDoc={this.handleSelectedDoc}
                        sandboxId={this.state.sandboxId}
                        sandboxApi={this.state.sandboxApi}
                        bearer={this.state.bearer}
                    />
                </Dialog>
            </div>
        );
    }
}