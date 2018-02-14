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
export default class PersonaDialog extends React.Component {
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

    handleSubmit = (e) => {
        console.log("this is something: " + e);
        console.log(e);
        this.setState({open: false});
        console.log(this.state.selectedDoc);
        this.props.handlePersonaSelection(this.state.selectedDoc);
    };

    handleSelectedDoc = (doc) => {
        this.setState({selectedDoc: doc});
        console.log("doc");
        console.log(doc);

    }


    componentWillMount(){
        // let token = 'eyJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJzYW5kX21hbiIsImlzcyI6Imh0dHBzOlwvXC9hdXRoLmhzcGNvbnNvcnRpdW0ub3JnXC8iLCJleHAiOjE1MTY4OTI3OTUsImlhdCI6MTUxNjgwNjM5NSwianRpIjoiYWRjNzIwYjYtOWU2MC00NWVlLTgyODctOGMxNTc4ZGI3NzNjIn0.BW8GTlpfUazXUfg_fLrZaopNUQgt8sDZgWaeExRU0MPclXTFTAw-XLUfUYZubBOavdIwVDrGpq3-DxFYSYptsMnalx_Htf4ESwCUJZgTGtwLSfHBbgbmwGWJ8sgEyyiIN-tfQeNT1EtjzTYS0AFhlfUePLOVebAuSbFT7zdyffw6Snb3hc86mePd1lgSmDCPBZ_11k8WseMxKCnYohROk2lQXuXIUiuTQE1dxtxZ1PPrCzxdVaAu8cR3Z9Qy3BUx2XOYZ-p4Bs7Z4zpfemoADI3nJklQ5s3__E9sDefzGr43btgbDwFZgSOkOj67B1nUO_AKq878DXsLIvqvXVfggg';
        let token = this.state.bearer
        // let url = 'https://sandbox-api.hspconsortium.org/userPersona?sandboxId=hspcdemo'
        let url = "https://" + this.state.sandboxApi + "/userPersona?sandboxId=" + this.state.sandboxId

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        })
            .then( response => response.json() )
            .then((responseData) => {
                var trimmedList = responseData.filter(function (rd) {
                    return (rd.resourceUrl.includes("Practitioner"));
                });
                const listItems = trimmedList.map((d) =>
                    <TableRow key={d.id} selected={this.isSelected()}>
                        <TableRowColumn>{d.personaName}</TableRowColumn>
                        <TableRowColumn>{d.personaUserId}</TableRowColumn>
                        <TableRowColumn>{d.resourceUrl}</TableRowColumn>
                    </TableRow>
                );
                this.setState({personaItems: listItems});
                this.setState({personaArray: trimmedList});

            })

    }


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
                onClick={this.handleSubmit}
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