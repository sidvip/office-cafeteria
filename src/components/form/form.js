import React from 'react';
import './form.css';
import LoginForm from './loginForm';
import axios from 'axios';
import RegisterForm from './registerForm';

export default class CafeteriaForm extends React.Component {

    
    render() {
        return (
            <div>
                <RegisterForm Visibility={this.props.isVisible} hideFormDiv={this.props.overlaidId}
                    axios={axios} showPopUp={this.props.showPopUpFunc} showLoginWindow={this.props.afterRegister}
                />
                <LoginForm Visibility={this.props.isVisible} hideFormDiv={this.props.overlaidId} 
                    axios={axios} showPopUp={this.props.showPopUpFunc} changeAvatar={this.props.changeAvatar}
                />
            </div>
        );
    }
}
