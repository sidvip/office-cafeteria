import React from 'react';
import './orderlist.css';

export default class OrderList extends React.Component {

    constructor(props) {
        super(props);
        this.getOrderDetails = this.getOrderDetails.bind(this);
    }

    getOrderDetails(e) {
        this.props.showDetails(e.target.closest('tr'));
    }
    render() {
        return (
            <div id="order-list" style={{display: this.props.showWishlist ? 'block' : 'none'}}>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="4" className="order-list-head"> Items Ordered</th>
                        </tr>
                        <tr>
                            <th>Order Number</th>
                            <th>Price</th>
                            <th>Ordering Time</th>
                            <th>Serving Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.orders.length > 0 ? 
                            this.props.orders.map((order, idx) => (
                                <tr key={"order-" + idx} onClick={this.getOrderDetails} data-order-number={order.number}>
                                    <td>{order.number}</td>
                                    <td>{order.price}</td>
                                    <td>{order.placedTime}</td>
                                    <td>{order.time  + " mins"}</td>
                                </tr>
                            )) :
                            <tr><td colSpan="4" style={{fontSize:'4vh', backgroundColor: 'red'}}>No Orders</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}