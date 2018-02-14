import React, { PureComponent } from "react"
import PersonIcon from 'react-icons/lib/md/person';


class PatientView extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
        };
    }

    render() {
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

        return (
            <div style={patientDivStyle}>
                <PersonIcon style={personIconStyle}/>
                <div style={infoTitleStyle}>Patient: </div>
                <div style={infoStyle}>{(this.props.patient != null) ? this.props.patient.resource.name[0].family : 'null'}</div>
                <div style={infoTitleStyle}>gender: </div>
                <div style={infoStyle}>{(this.props.patient != null) ? this.props.patient.resource.gender : 'null'}</div>
                <div style={infoTitleStyle}>dob: </div>
                <div style={infoStyle}>{(this.props.patient != null) ? this.props.patient.resource.birthDate : 'null'}</div>
                <div style={infoTitleStyle}>MRN: </div>
                <div style={infoStyle}>{(this.props.patient != null) ? this.props.patient.resource.identifier[0].value : 'null'}</div>
            </div>

        )
    }
}

export default PatientView;