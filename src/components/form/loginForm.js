import React from 'react';
import PageLabel from '../label/label';
import CookieHandler from '../../datahandling/cookieStoreManager';

export default class LoginForm extends React.Component {


    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            loginCreds: {
                empId: "",
                password: "",
            }
        };
        this.mapWarnings = {
            empId: " Employee Id field is empty",
            password: "Password field is empty",
        };

        this.handleLoginInput = this.handleLoginInput.bind(this);
    }

    handleLoginInput(e) {
        this.setState((state, prop) => {
            state.loginCreds[e.target.name] = e.target.value;
        });
    }
    handleLogin(event) {
        event.preventDefault();

        let furtherProcess = true;
        for(let idx=0; idx < Object.keys(this.state.loginCreds).length; idx++) {
            if (this.state.loginCreds[ Object.keys(this.state.loginCreds)[idx]] === "") {
                this.props.showPopUp(this.mapWarnings[ Object.keys(this.state.loginCreds)[idx]], true);
                furtherProcess = false;
                break;
            }
        }

        if (furtherProcess) {
            document.getElementsByClassName('lds-facebook')[0].style.visibility = 'visible';
            this.props.axios.post('/api/employees/login', this.state.loginCreds)
                .then(resp => {
                    if (resp.data.warning) {
                        this.props.showPopUp(resp.data.warning.message, true);
                    } else {
                        this.props.showPopUp(resp.data.message, false);
                        this.props.changeAvatar(resp.data.usInfo.avatar);
                        let cookieHandler = new CookieHandler(resp.data.usInfo);
                        cookieHandler.addCookies();
                        this.props.hideFormDiv();
                    }
                    document.getElementsByClassName('lds-facebook')[0].style.visibility = 'hidden';
                })
                .catch(err => {
                    console.error(err);
                    this.props.showPopUp(err.message, true);
                    document.getElementsByClassName('lds-facebook')[0].style.visibility = 'hidden';
                });
        }
    }

    render() {
        return (
            <div>
            <form className="cafe-form" id="login-form" style={this.props.Visibility ? {display: 'none'} : {display: 'block'}} onSubmit={this.handleLogin}>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <table>
                    <tbody>
                    <tr>
                        <td><PageLabel labelValue={"Employee ID "} type="sub-heading" /></td>
                        <td><input type="text" placeholder="Enter Employee ID" onChange={this.handleLoginInput} name="empId" /></td>
                    </tr>

                    <tr>
                        <td><PageLabel labelValue={"Passoword "} type="sub-heading" /></td>
                        <td><input type="password" placeholder="Enter Password" onChange={this.handleLoginInput} name="password"/></td>
                    </tr>

                    </tbody>
                </table>

                <input className="form-button" value="Login" type="submit"/>
            </form>
            </div>
        );
    }
}