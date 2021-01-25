import React from 'react';
import './cafemenu.css';
import MenuItems from '../../menuItems.json';

export default class CafeMenu extends React.Component {
    render() {
        return (
            <div id="menu-div">
                <table>
                    <thead>
                        <tr>
                            <th colSpan="3" className="grid-heading">Menu Card</th>
                        </tr>
                        <tr>
                            <th>Select Item</th>
                            <th>Food Items</th>
                            <th>Price (&#8377;)</th>
                        </tr>
                    </thead>
                        {
                            Object.keys(MenuItems).map((key, index) => {
                            return (
                                <tbody key={"tbody-" + index}>
                                <tr style={{height:'6vh'}}>
                                    <td colSpan="3" style={{backgroundColor: "black", color: "white", fontWeight: "bold", fontSize:'2.8vh', position: "sticky",
                                    top:'9vh'}}>{key}</td>
                                </tr>
                                {MenuItems[key].map((product, idx) => {
                                    let productName = Object.keys(product)[0];
                                    let productPrice = Object.values(product)[0]
                                    return (
                                        <tr key={'rand-' + idx}>
                                            <td><input type="checkbox" onChange={this.props.selectCallBack}
                                                    data-item-details={productName + ":" + productPrice}/></td>
                                            <td>{productName}</td>
                                            <td>{productPrice}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            )})
                        }
                </table>
            </div>
        );
    }
}