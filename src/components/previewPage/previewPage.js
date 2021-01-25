import React from 'react';
import './previewPage.css';

export default class PreviewPane extends React.Component {

    constructor(props) {
        super(props);
        this.closePreview = this.closePreview.bind(this);
    }

    closePreview() {
        this.props.hideShowDiv(false);
    }

    render() {
        return (
            <div id="preview-pane">
                <button onClick={this.closePreview} className="closeButton"> &#x274C;
                </button>
                <table>
                    <tbody>
                        <tr>
                            <td>Full Name : {this.props.psInfo.name}</td>
                            <td rowSpan="5"><img src={this.props.psInfo.imgName} className="id-pic" alt=" User Personal Id"/></td>
                        </tr>
                        <tr>
                            <td>Organisation Name : {this.props.psInfo.orgName}</td>
                        </tr>
                        <tr>
                            <td>Employee Id : {this.props.psInfo.empId}</td>
                        </tr>
                        <tr>
                            <td>Mobile Number: {this.props.psInfo.mobile}</td>
                        </tr>
                        <tr>
                            <td>Email : {this.props.psInfo.email}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        )
    }
}