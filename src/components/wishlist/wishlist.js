import React from 'react';
import './wishlist.css';

export default class Wishlist extends React.Component {

    render() {
        return (
            <div id="wishlist" style={{display: this.props.showWishlist ? 'block' : 'none'}}>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="3" className="wishlist-head"> Wishlist Items </th>
                        </tr>
                        <tr>
                            <th>Food Item</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.wishlistOrders.length > 0 ? 
                            this.props.wishlistOrders.map((order, idx) => (
                                <tr key={"wish-" + idx}>
                                    <td>{order.food}</td>
                                    <td>{order.price}</td>
                                    <td>
                                        <input defaultValue="1" min="1" className="quantity-entry"
                                            type="number" onKeyDown={this.props.updateQuant} 
                                            data-update-order={order.food + ":" + order.price}
                                            onKeyPress={(e) => {e.preventDefault();}}
                                        />
                                    </td>
                                </tr>
                            )) :
                            <tr><td colSpan="3" style={{fontSize:'5vh', backgroundColor: 'red'}}>No items in wishlist</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}