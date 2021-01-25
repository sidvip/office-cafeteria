import React from 'react';
import PageLabel from '../label/label';

export default class RegisterForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleRegisterFormInput = this.handleRegisterFormInput.bind(this);
        this.state = {
            allValues : {
                name: "",
                orgName: "",
                empId: "",
                mobile: "",
                email: "",
                password: "",
                psImageData: ""
            }
        };
        this.mapWarnings = {
            name: "Name field is empty",
            orgName: "Organisation field is empty",
            empId: " Employee Id field is empty",
            mobile: "Mobile field is empty",
            email: "Email field is empty",
            password: "Password field is empty",
            psImageData: "Image field is empty"
        };
    }

    updateImageField(e) {
        let FR = new FileReader();
        FR.readAsDataURL(e.target.files[0]);

        FR.onloadend = (data) => {
            this.setState((state, prop) => {
                state.allValues[e.target.name] = data.currentTarget.result;
            });
        };
    }
    handleRegisterFormInput(evt) {
        let name = evt.target.name;
        let value = evt.target.value;
        if (evt.target.type !== 'file') {
            this.setState((state, prop) => {
                state.allValues[name] = value;
            });
        } else {
            if (/(jpeg|jpg|png)$/.test(evt.target.files[0].type)) {
                this.updateImageField(evt);
            } else {
                evt.target.value = "";
                this.props.showPopUp('Upload Valid Image types - JPG/PNG/JPEG', true);
            }
        }
    }
    handleRegister(evt) {
        evt.preventDefault();

        let furtherProcess = true;
        for(let idx=0; idx < Object.keys(this.state.allValues).length; idx++) {
            if (this.state.allValues[ Object.keys(this.state.allValues)[idx]] === "") {
                this.props.showPopUp(this.mapWarnings[ Object.keys(this.state.allValues)[idx]], true);
                furtherProcess = false;
                break;
            }
        }

        function clearFields() {
            for (let idx=0; idx < (evt.target.elements.length -1); idx++) {
                evt.target.elements[idx].value = "";
            }
        }

        if (furtherProcess) {
            document.getElementsByClassName('lds-facebook')[0].style.visibility = 'visible';
            this.props.axios.post('/api/employees/register', this.state.allValues)
                .then(resp => {
                    if (resp.data.warning) {
                        this.props.showPopUp(resp.data.warning.message, true);
                    } else {
                        this.props.showPopUp(resp.data.message, false);
                        this.props.showLoginWindow();
                        clearFields();
                    }
                    document.getElementsByClassName('lds-facebook')[0].style.visibility = 'hidden';
                    // this.props.hideFormDiv();
                })
                .catch(err => {
                    console.error(err);
                    this.props.showPopUp(err.message, true);
                    // this.props.hideFormDiv();
                    document.getElementsByClassName('lds-facebook')[0].style.visibility = 'hidden';
                });
        }
    }
    render() {
        return (
            <form className="cafe-form" id="register-form" style={this.props.Visibility ? {display: 'block'} : {display: 'none'}} onSubmit={this.handleRegister}>
            <table>
                <tbody>
                <tr>
                    <td><PageLabel labelValue={"Full Name "} type="sub-heading" /></td>
                    <td><input type="text" placeholder="Enter Full Name" onChange={this.handleRegisterFormInput} name="name"/></td>
                </tr>

                <tr>
                    <td><PageLabel labelValue={"Organisation Name "} type="sub-heading" /></td>
                    <td><input type="text" placeholder="Enter Organisation Name" onChange={this.handleRegisterFormInput} name="orgName"/></td>
                </tr>

                <tr>
                    <td><PageLabel labelValue={"Employee ID "} type="sub-heading" /></td>
                    <td><input type="text" placeholder="Enter Employee ID" onChange={this.handleRegisterFormInput} name="empId"/></td>
                </tr>

                <tr>
                    <td><PageLabel labelValue={"Mobile No. "} type="sub-heading" /></td>
                    <td><input type="number" placeholder="Enter Mobile No" onChange={this.handleRegisterFormInput} name="mobile"/></td>
                </tr>

                <tr>
                    <td><PageLabel labelValue={"Email "} type="sub-heading" /></td>
                    <td><input type="email" placeholder="Enter Email" onChange={this.handleRegisterFormInput} name="email"/></td>
                </tr>

                <tr>
                    <td><PageLabel labelValue={"Passoword "} type="sub-heading" /></td>
                    <td><input type="password" placeholder="Enter Password" onChange={this.handleRegisterFormInput} name="password"/></td>
                </tr>

                <tr>
                    <td><PageLabel labelValue={"Upload Id Card "} type="sub-heading" /></td>
                    <td><input type="file" accept="image/x-png, image/jpeg, image/jpg" onChange={this.handleRegisterFormInput} name="psImageData"/></td>
                </tr>

                </tbody>
            </table>

            <input className="form-button" value="Sign Up" type="submit"/>
            {/* <ReactTooltip backgroundColor="black" textColor="white" arrowColor="green" borderColor="grey" border="2.5px"/> */}

        </form>
        );
    }
}