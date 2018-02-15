import React, {Component} from 'react';
import {AppBar, Drawer, MenuItem} from "material-ui";
import PatientSelectorDialog from "../DialogBoxes/PatientSelectorDialog";
import PersonaSelectorDialog from "../DialogBoxes/PersonaSelectorDialog";


const style = {
    paper: {
        display: 'inline-block',
        float: 'left',
        margin: '16px 32px 16px 0',
    },
    rightIcon: {
        textAlign: 'center',
        lineHeight: '24px',
    },
};

class HeaderBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selectedItem: 1,
            title: "Choose Patient",
        };

    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

    render() {

        return (
            <div>
                <AppBar onLeftIconButtonClick={this.handleToggle}
                        title='Welcome to EHR Simulator'
                        // iconElementRight={<HeaderIconButton
                        //     selectedPersonaName={this.props.selectedPersonaName}
                        //     handlePersonaSelection={this.props.handlePersonaSelection}
                        //     bearer={this.props.bearer}
                        //     sandboxApi={this.props.sandboxApi}
                        //     sandboxId={this.props.sandboxId}
                        // />}
                ></AppBar>
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <MenuItem onClick={this.handleClose}>
                        <PatientSelectorDialog
                            handlePatientSelection={this.props.handlePatientSelection}
                            bearer={this.props.bearer}
                            sandboxApi={this.props.sandboxApi}
                            sandboxId={this.props.sandboxId}
                        />
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>
                        <PersonaSelectorDialog
                            handlePersonaSelection={this.props.handlePersonaSelection}
                            bearer={this.props.bearer}
                            sandboxApi={this.props.sandboxApi}
                            sandboxId={this.props.sandboxId}
                        />
                    </MenuItem>
                </Drawer>
            </div>
        );
    }
}

export default HeaderBar;