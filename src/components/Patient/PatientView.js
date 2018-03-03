import React, {PureComponent} from "react"
import PersonIcon from 'react-icons/lib/md/person';
import PatientSelectorDialog from "../Navigation/DialogBoxes/PatientSelectorDialog";
import {getPatientName} from '../../utils';
import moment from "moment";

import './Patient.css';

const patientDivStyle = {
    float: 'left',
    width: '100%',
    height: '80px',
    background: 'linear-gradient(#3EA8E7,#0C76B4)',
    borderStyle: 'solid',
    borderWidth: '1px',

};
const infoStyle = {
    float: 'left',
    padding: '30px 5px 5px 5px',
    color: 'white'
};
const infoTitleStyle = {
    float: 'left',
    padding: '30px 5px 5px 30px',
};
const personIconStyle = {
    float: 'left',
    height: '70px',
    width: '70px',
    padding: '5px 10px 10px 5px',
};

class PatientView extends PureComponent {
    render() {
        const mrn = this.props.patient && this.props.patient.resource.identifier && this.props.patient.resource.identifier[0].value;

        return (
            <div style={patientDivStyle}>
                <PersonIcon style={personIconStyle}/>
                {this.props.patient
                    ? <div>
                        <div style={infoTitleStyle}>Patient:</div>
                        <div style={infoStyle}>{getPatientName(this.props.patient.resource)}</div>
                        <div style={infoTitleStyle}>Gender:</div>
                        <div style={infoStyle}>{this.props.patient.resource.gender}</div>
                        <div style={infoTitleStyle}>DOB:</div>
                        <div style={infoStyle}>{moment(this.props.patient.resource.birthDate).format("DD MMM YYYY")}</div>
                        <div style={infoTitleStyle}>MRN:</div>
                        <div style={infoStyle}>{mrn}</div>
                    </div>
                    : <div style={infoStyle}>
                        Please select patient
                    </div>}
                <PatientSelectorDialog
                    refApi={this.props.refApi}
                    handlePatientSelection={this.props.handlePatientSelection}
                    bearer={this.props.bearer}
                    sandboxApi={this.props.sandboxApi}
                    sandboxId={this.props.sandboxId}
                />
            </div>

        )
    }
}

export default PatientView;
