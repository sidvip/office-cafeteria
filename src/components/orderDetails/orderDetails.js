import React from 'react';
import './orderDetails.css';

export default class OrderDetails extends React.Component {
    render() {
        return (
            <div id="order-details" style={{display : this.props.showOrderDetails ? 'block' : 'none'}} >
                <table style={{visibility : this.props.orderListItems ? 'visible' : 'hidden'}}>
                    <tbody>
                        <tr>
                            <td>
                                Items Placed
                            </td>
                            <td>
                                {this.props.selectedInfo.itemsList}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Amount Paid
                            </td>
                            <td>
                                {this.props.selectedInfo.total}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}