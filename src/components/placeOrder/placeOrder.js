import React from 'react';
import './placeOrder.css';

export default class PlaceOrder extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     showLabel: false
        // };
        this.placeOrder = this.placeOrder.bind(this);
    }

    placeOrder() {
        // this.setState({showLabel: !this.state.showLabel});
        // let timeOut = setTimeout(() =>{
            // this.setState({showLabel: !this.state.showLabel});
            // clearTimeout(timeOut);
        // }, 3000);
        this.props.orderManageCallBack();
    }
    render () {
        return (
            <div id="place-order" style={{display : (this.props.showOrderDetails && this.props.wishListItems) ? 'block' : 'none'}}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label className="pc-label">Number of Food Items : {this.props.count}</label>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label className="pc-label"> Pay (&#8377;) : {this.props.total}</label>
                        </td>
                        <td>
                            <button className="pc-button" onClick={this.placeOrder} >
                                Place Order
                            </button>

                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                            {/* <label className="pc-label" style={{color: 'yellow',
                                                                fontSize: '3vh',
                                                                display: this.state.showLabel ? 'inline-block' : 'none'
                                                               }}> Order Placed - Check Order List</label> */}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        )
    }
}