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
        this.state = {
            bearer: props.match.params.bearer,
            sandboxApi: props.match.params.sandboxApi,
            sandboxId: props.match.params.sandboxId,
            open: true,
        }
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSubmit = () => {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton
                label="Create Persona"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];

        return (
            <div>
                <Dialog
                    title="Select A Practitioner Persona"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <PersonaTable
                        sandboxId={this.state.sandboxId}
                        sandboxApi={this.state.sandboxApi}
                        bearer={this.state.bearer}
                    />
                </Dialog>
            </div>
        );
    }
}