import React from 'react';
import $ from 'jquery';
import LogImg from '../../appearance/loginImage.png';
import './loginImage.css';

export default class LoginImg extends React.Component {

    constructor(props) {
        super(props);
        this.showLogOutButton = this.showLogOutButton.bind(this);
        this.showPersInfo = this.showPersInfo.bind(this);
        this.logOut = this.logOut.bind(this);
        this.state = {
            showLog: false
        };
    }
    logOut() {
        this.setState({showLog: false});
        this.showLogOutButton();
        this.props.showForm();
    }

    showPersInfo(){
        this.setState({showLog: false});
        this.props.showPSInfo(true);
        this.showLogOutButton();
    }
    showLogOutButton() {
        !this.state.showLog ? $('#login-icon').addClass('manage-radius') : $('#login-icon').removeClass('manage-radius');
        this.setState({showLog: !this.state.showLog});
    }

    render() {
        return (
            <div>
                <img src={this.props.userAvatar ? this.props.userAvatar : LogImg} id="login-icon" onClick={this.showLogOutButton} alt="Login"/>
                <span className="user-button ps-butt" style={{'display': this.state.showLog ? 'block': 'none'}} onClick={this.showPersInfo}>Personal Info</span>
                <span className="user-button" style={{'display': this.state.showLog ? 'block': 'none'}} onClick={this.logOut}>Logout</span>
            </div>
        )
    }
}