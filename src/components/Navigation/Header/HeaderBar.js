import React, { Component } from 'react';
import { getPatientName } from '../../../utils';
import moment from "moment";
import PersonIcon from "material-ui/svg-icons/action/account-circle";
import HospitalIcon from "material-ui/svg-icons/maps/local-hospital";
import EventIcon from "material-ui/svg-icons/action/event";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faUserMd } from '@fortawesome/fontawesome-free-solid';
import "./Header.css";

const ContextIcon = <svg width="100%" height="100%" viewBox="0 0 24 24" version="1.1" style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 1.41421 }}>
    <rect x="0" y="0" width="24" height="24" style={{ fill: 'none' }}/>
    <g transform="matrix(6.12323e-17,1,-1,6.12323e-17,23.96,-8.88178e-16)">
        <path
            d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8C19.66,8 21,6.66 21,5C21,3.34 19.66,2 18,2C16.34,2 15,3.34 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9C4.34,9 3,10.34 3,12C3,13.66 4.34,15 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.35C15.11,18.56 15.08,18.78 15.08,19C15.08,20.61 16.39,21.92 18,21.92C19.61,21.92 20.92,20.61 20.92,19C20.92,17.39 19.61,16.08 18,16.08Z"
            style={{ fillRule: 'nonzero' }}/>
    </g>
</svg>;
const DescriptionIcon = <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px"
                             height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24">
    <g id="Header_x2F_BG" display="none">
        <rect x="-402" y="-270" display="inline" fill="#F1F1F2" width="520" height="520"/>
    </g>
    <g id="Bounding_Boxes">
        <g id="ui_x5F_spec_x5F_header_copy_3">
        </g>
        <path fill="none" d="M0,0h24v24H0V0z"/>
    </g>
    <g id="Rounded">
        <g id="ui_x5F_spec_x5F_header_copy_5">
        </g>
        <path d="M14.59,2.59C14.21,2.21,13.7,2,13.17,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.89,2,1.99,2H18c1.1,0,2-0.9,2-2V8.83
		c0-0.53-0.21-1.04-0.59-1.41L14.59,2.59z M15,18H9c-0.55,0-1-0.45-1-1v0c0-0.55,0.45-1,1-1h6c0.55,0,1,0.45,1,1v0
		C16,17.55,15.55,18,15,18z M15,14H9c-0.55,0-1-0.45-1-1v0c0-0.55,0.45-1,1-1h6c0.55,0,1,0.45,1,1v0C16,13.55,15.55,14,15,14z M13,8
		V3.5L18.5,9H14C13.45,9,13,8.55,13,8z"/>
    </g>
    <g id="Sharp" display="none">
        <g id="ui_x5F_spec_x5F_header_copy_4" display="inline">
        </g>
        <path display="inline" d="M14,2H4v20h16V8L14,2z M16,18H8v-2h8V18z M16,14H8v-2h8V14z M13,9V3.5L18.5,9H13z"/>
    </g>
    <g id="Outline" display="none">
        <g id="ui_x5F_spec_x5F_header" display="inline">
        </g>
        <g display="inline">
            <rect x="8" y="16" width="8" height="2"/>
            <rect x="8" y="12" width="8" height="2"/>
            <path d="M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.89,2,1.99,2H18c1.1,0,2-0.9,2-2V8L14,2z M18,20L6,20V4h7v5h5V20z"/>
        </g>
    </g>
    <g id="Duotone" display="none">
        <g id="ui_x5F_spec_x5F_header_copy_2" display="inline">
        </g>
        <g display="inline">
            <path opacity="0.3" d="M13,4H6v16l12,0V9h-5V4z M16,18H8v-2h8V18z M16,12v2H8v-2H16z"/>
            <g>
                <rect x="8" y="16" width="8" height="2"/>
                <rect x="8" y="12" width="8" height="2"/>
                <path d="M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.89,2,1.99,2H18c1.1,0,2-0.9,2-2V8L14,2z M18,20L6,20V4h7v5h5V20z"/>
            </g>
        </g>
    </g>
    <g id="Fill" display="none">
        <g id="ui_x5F_spec_x5F_header_copy" display="inline">
        </g>
        <path display="inline" d="M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.89,2,1.99,2H18c1.1,0,2-0.9,2-2V8L14,2z M16,18H8v-2h8V18z M16,14H8
		v-2h8V14z M13,9V3.5L18.5,9H13z"/>
    </g>
    <g id="nyt_x5F_exporter_x5F_info" display="none">
    </g>
</svg>;
const BulbIcon = <svg width="100%" height="100%" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"
                      style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 1.41421 }}>
    <g transform="matrix(0.0390625,0,0,0.0390625,4.5,2)">
        <path
            d="M272,428L272,456C272,466.449 265.32,475.334 256,478.629L256,488C256,501.255 245.255,512 232,512L152,512C138.745,512 128,501.255 128,488L128,478.629C118.68,475.334 112,466.449 112,456L112,428C112,421.373 117.373,416 124,416L260,416C266.627,416 272,421.373 272,428ZM128,176C128,140.71 156.71,112 192,112C200.837,112 208,104.836 208,96C208,87.164 200.837,80 192,80C139.065,80 96,123.065 96,176C96,184.836 103.164,192 112,192C120.836,192 128,184.836 128,176ZM192,48C262.734,48 320,105.254 320,176C320,253.602 282.617,236.477 239.02,336L144.98,336C101.318,236.33 64,253.869 64,176C64,105.265 121.254,48 192,48M192,0C94.805,0 16,78.803 16,176C16,277.731 67.697,267.541 106.516,368.674C110.066,377.923 118.986,384 128.892,384L255.107,384C265.013,384 273.933,377.922 277.483,368.674C316.303,267.541 368,277.731 368,176C368,78.803 289.195,0 192,0Z"
            style={{ fill: 'rgb(140,140,140)', fillRule: 'nonzero' }}/>
    </g>
</svg>;
const LinkIcon = <svg version="1.1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24">
    <g id="Bounding_Boxes">
        <g id="ui_x5F_spec_x5F_header_copy_3" display="none">
        </g>
        <path fill="none" d="M0,0h24v24H0V0z"/>
    </g>
    <g id="Rounded_1_">
        <g id="ui_x5F_spec_x5F_header_copy_6" display="none">
        </g>
        <path d="M17,7h-3c-0.55,0-1,0.45-1,1c0,0.55,0.45,1,1,1h3c1.65,0,3,1.35,3,3c0,1.65-1.35,3-3,3h-3c-0.55,0-1,0.45-1,1
		c0,0.55,0.45,1,1,1h3c2.76,0,5-2.24,5-5S19.76,7,17,7z M8,12c0,0.55,0.45,1,1,1h6c0.55,0,1-0.45,1-1c0-0.55-0.45-1-1-1H9
		C8.45,11,8,11.45,8,12z M10,15H7c-1.65,0-3-1.35-3-3c0-1.65,1.35-3,3-3h3c0.55,0,1-0.45,1-1c0-0.55-0.45-1-1-1H7
		c-2.76,0-5,2.24-5,5s2.24,5,5,5h3c0.55,0,1-0.45,1-1C11,15.45,10.55,15,10,15z"/>
    </g>
</svg>;

class HeaderBar extends Component {

    constructor (props) {
        super(props);
        this.state = {
            open: false,
            selectedItem: 1,
            title: "Choose Patient",
        };
    }

    render () {
        const mrn = this.props.patient && this.props.patient.resource.identifier && this.props.patient.resource.identifier[0].value;

        let cookieData = this.getCookieData();

        return <div className="header-wrapper">
            <div className="header-patient-wrapper">
                <div className="patient-icon-wrapper" onClick={() => this.props.togglePatientSelector && this.props.togglePatientSelector()}>
                    <PersonIcon style={{ width: "74px", height: "74px" }}/>
                </div>
                {this.props.patient
                    ? <div className="header-patient-info-wrapper">
                        <div className="header-patient-info-row">
                            <div className="header-info patient-name">
                                <span>{getPatientName(this.props.patient.resource)}</span>
                            </div>
                        </div>
                        <div>
                            <span className="header-info dob">
                                <span>DOB:</span>
                                <span>{moment(this.props.patient.resource.birthDate).format("DD MMM YYYY")}</span>
                            </span>
                            <span className="header-info age">
                                <span>Age: </span>
                                <span>{this.getAge(this.props.patient.resource.birthDate)}</span>
                            </span>
                        </div>
                        <div>
                            <span className="header-info mrn">
                                <span>MRN:</span>
                                <span>{mrn}</span>
                            </span>
                            <span className="header-info gender">
                                <span>Gender:</span>
                                <span>{this.props.patient.resource.gender.charAt(0).toUpperCase() + this.props.patient.resource.gender.slice(1)}</span>
                            </span>
                        </div>
                    </div>
                    : <div className="header-patient-info-wrapper">
                        <div className="header-patient-info-row no-selection">
                            <div className="header-patient-info">
                                <span>Please select patient</span>
                            </div>
                        </div>
                    </div>}
            </div>
            <div className='header-context-wrapper'>
                {cookieData.encounter && <span className='section-value'>
                        <span className='context-icon'>{EventIcon}</span>
                        <span>{cookieData.encounter}</span>
                    </span>}
                {cookieData.location && <span className='section-value'>
                        <span className='context-icon'>{HospitalIcon}</span>
                        <span>{cookieData.location}</span>
                    </span>}
                {cookieData.resource && <span className='section-value'>
                        <span className='context-icon'>{DescriptionIcon}</span>
                        <span>{cookieData.resource}</span>
                    </span>}
                {cookieData.intent && <span className='section-value'>
                        <span className='context-icon bulb'>{BulbIcon}</span>
                        <span>{cookieData.intent}</span>
                    </span>}
                {cookieData.smartStyleUrl && <span className='section-value'>
                        <span className='context-icon'>{LinkIcon}</span>
                        <span>{cookieData.smartStyleUrl}</span>
                    </span>}
                <span className='section-title'>

                    </span>
                {cookieData.contextParams.length > 0 && <span className='context-icon custom'>{ContextIcon}</span>}
                {cookieData.contextParams.map(param => {
                    return <span className='custom-context section-title'>
                            <span>{param.name}: </span>
                            <span>{param.value}</span>
                    </span>;
                })}
            </div>
            <div className="header-persona-wrapper">
                {this.props.persona
                    ? <div className="header-persona-info-wrapper">
                        <div className="header-info persona-name">
                            <span>{this.props.persona.personaName}</span>
                        </div>
                        <div className="header-info persona-id">
                            <span>FHIR ID:</span>
                            <span>{this.props.persona.fhirId}</span>
                        </div>
                    </div>
                    : <div className="header-persona-info-wrapper">
                        <div className="header-persona-info-row no-selection">
                            <div className="header-persona-info">
                                <span>Please select persona</span>
                            </div>
                        </div>
                    </div>}
                <div className="persona-icon-wrapper" onClick={() => this.props.togglePersonaSelector && this.props.togglePersonaSelector()}>
                    <FontAwesomeIcon icon={faUserMd} style={{ width: "56px", height: "56px", marginLeft: "10px", marginTop: "5px", color: "rgb(255, 255, 255)" }}/>
                </div>
            </div>
        </div>;
    }

    getCookieData = () => {
        let data = {};
        let name = 'hspc-launch-token=';
        let decodedCookie = decodeURIComponent(document.cookie);
        if (decodedCookie.indexOf(name) >= 0) {
            let ca = decodedCookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    data = c.substring(name.length, c.length);
                }
            }

            sessionStorage.launchData = data;
            data = JSON.parse(data);

            const domain = window.location.host.split(":")[0].split(".").slice(-2).join(".");
            document.cookie = `hspc-launch-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${domain}; path=/`;
        } else if (sessionStorage.launchData) {
            data = JSON.parse(sessionStorage.launchData);
        }

        return data;
    };

    getAge = (birthday) => {
        let currentDate = moment();
        let birthDate = moment(Date.parse(birthday));

        let result = "";
        let years = currentDate.diff(birthDate, 'years');
        result += years + 'y ';
        currentDate.subtract({ years });
        let months = currentDate.diff(birthDate, 'months');
        result += months + 'm ';
        currentDate.subtract({ months });
        let days = currentDate.diff(birthDate, 'days');
        result += days + 'd';
        return result;
    };
}

export default HeaderBar;
