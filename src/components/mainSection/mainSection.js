import React from 'react';
import $ from 'jquery';
import axios from 'axios';

import Icon from '../icon/icon';
import LoginImg from '../loginImage/loginImage';

import Warning from '../../appearance/warning.png';
import Success from '../../appearance/success.png';

import './mainSection.css';
import {Animated} from "react-animated-css";

import CafeMenu from '../cafemenu/cafemenu';

import Wishlist from '../wishlist/wishlist';
import OrderList from '../orderlist/orderlist';

import CafeteriaForm from '../form/form';

import PreviewPane from '../previewPage/previewPage';
import PlaceOrder from '../placeOrder/placeOrder';
import OrderDetails from '../orderDetails/orderDetails';

import CookieHandler from '../../datahandling/cookieStoreManager';


export default class MainSection extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            showRegisterForm : true,
            wishList : [],
            orderList: [],
            darkenFirstButton: true,
            showList: true,
            trackButtonClass: undefined,
            loadBackground:false,
            showOrderInfo: false,
            totalAmountPaid: 0,
            orderNumber: 1,
            selectedOrderInfo: {},
            clickedOrder: false,
            userAvatar: undefined,
            psInfo: {
                name: "",
                imgName: "",
                orgName: "",
                empId: "",
                mobile: "",
                email: ""
            }
        };
        this.registerButtonRef = React.createRef();
        this.loginButtonRef = React.createRef();
        this.addItemsToOrder = this.addItemsToOrder.bind(this);
        this.handleNavigation = this.handleNavigation.bind(this);
        this.hideFormDiv = this.hideFormDiv.bind(this);
        this.showFormDiv = this.showFormDiv.bind(this);
        this.toggleBackground = this.toggleBackground.bind(this);
        this.toggleSelectedItemColor = this.toggleSelectedItemColor.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
        this.orderPlaced = this.orderPlaced.bind(this);
        this.getOrderFullDetails = this.getOrderFullDetails.bind(this);
        this.hidePreviewPanel = this.hidePreviewPanel.bind(this);
        this.showPopUp = this.showPopUp.bind(this);
        this.changeAvatar = this.changeAvatar.bind(this);
        this.manipulatePSInfo = this.manipulatePSInfo.bind(this);
        this.loadOrders = this.loadOrders.bind(this);
    }
    showPopUp(msg, warning) {
        if (warning) {
            $('.img-logo').attr("src", Warning);
        } else {
            $('.img-logo').attr("src", Success);
        }
        $('.inline-text').text(msg);
        $('#warning-window').css({
            visibility: 'visible',
            top: '6vh',
        });
        let tO = setTimeout(() => {
            $('#warning-window').css({
                visibility: 'hidden',
                top: '0vh',
            });
            $('.img-logo').attr("src", "");
            clearTimeout(tO);
        }, 5000);
    }

    toggleBackground(value) {
        $('.select-item').css({display: value});
        $('.order-item').css({display: value});
        $('#order-wishlist-nav').css({display: value});
        $('.bottom-div').css({display: value});
    }

    toggleSelectedItemColor(ele, value) {
        for ( let child of ele.children) {
            child.style.backgroundColor = value;
        }
    }

    hideFormDiv() {
        $("#form-replace-div").css({display: 'none'});
        this.toggleBackground('block');
    }

    showFormDiv() {
        $("#form-replace-div").css({display: 'block'});
        this.setState({userAvatar: undefined});
        this.toggleBackground('none');
    }

    addRemoveHighlight(isRegister, isLogin) {
        isRegister ? this.registerButtonRef.current.classList.add('selected-control') :
                        this.registerButtonRef.current.classList.remove('selected-control');
        isLogin ? this.loginButtonRef.current.classList.add('selected-control') :
                        this.loginButtonRef.current.classList.remove('selected-control');
    }
    handleLogin() {
        this.addRemoveHighlight(false, true);
        this.setState({showRegisterForm:false});
    }

    handleRegister() {
        this.addRemoveHighlight(true, false);
        this.setState({showRegisterForm:true});
    }


    changeAvatar(avatarURL) {
        this.setState({userAvatar: avatarURL});
    }

    loadOrders() {
            document.getElementsByClassName('lds-facebook')[0].style.visibility = 'visible';
            let cmh = new CookieHandler();
            axios.post('api/orders/list',{empId: cmh.getValueOfSpecificCookie('empId')},
            {
                headers: {
                        Authorization: "Bearer " + cmh.getValueOfSpecificCookie('bearerToken')
                    }
            }).then(resp => {
                let reversedArray = resp.data.allOrders.reverse();
                for(let idx = 0; idx < resp.data.allOrders.length; ++idx) {
                    reversedArray[idx].number = idx + 1;
                }
                this.setState({
                    orderList: reversedArray
                });
                document.getElementsByClassName('lds-facebook')[0].style.visibility = 'hidden';
            }).catch(err => {
                this.showPopUp(err.message, true);
                document.getElementsByClassName('lds-facebook')[0].style.visibility = 'hidden';
            });
    }

    handleNavigation(e) {
        if (this.state.trackButtonClass !== e.target.classList[1]) {
            this.setState({
                showList: !this.state.showList,
                darkenFirstButton: !this.state.darkenFirstButton,
                trackButtonClass: e.target.classList[1],
                showOrderInfo: !this.state.showOrderInfo
            });
        }
        if (e.target.classList[1] === 'button-2') {
            this.loadOrders();
        }
    }

    addItemsToOrder(selectedObject) {
        let dataArray = selectedObject.target.dataset.itemDetails.split(":");
        if (selectedObject.target.checked) {
            this.toggleSelectedItemColor(selectedObject.target.closest('tr'), "red");
            this.state.wishList.push({
                'food': dataArray[0], 'price': dataArray[1] , quantity: 1
            });
            this.setState({
                wishList: this.state.wishList,
                totalAmountPaid: this.state.totalAmountPaid + Number(dataArray[1])
            });

        } else {

            let deductedAmount;
            this.toggleSelectedItemColor(selectedObject.target.closest('tr'), "");
            this.state.wishList.forEach((ele, idx) => {
                if (ele.food === dataArray[0] && ele.price === dataArray[1]) {
                    deductedAmount = Number(dataArray[1]);
                    this.state.wishList.splice(idx, 1);
                }
            });
            this.setState({
                wishList: this.state.wishList,
                totalAmountPaid: this.state.totalAmountPaid - deductedAmount
            });
        }
    }

    orderPlaced() {

        let cm = new CookieHandler();
        let wishedOrder = {
            number: this.state.orderNumber,
            price: this.state.totalAmountPaid,
            placedTime: new Date().toLocaleString(),
            time: Math.round(Math.random() * 60 + 15),
            items: this.state.wishList
        };
        document.getElementsByClassName('lds-facebook')[0].style.visibility = 'visible';

        axios.post('api/orders/place',{
            orderedItems: this.state.wishList,
            name: cm.getValueOfSpecificCookie('name'),
            mobNo: cm.getValueOfSpecificCookie('mobile'),
            empId: cm.getValueOfSpecificCookie('empId'),
            orderingTime: wishedOrder.placedTime,
            servingTime: wishedOrder.time,
            completeOrder: wishedOrder
        },
        {
            headers: {
                    Authorization: "Bearer " + cm.getValueOfSpecificCookie('bearerToken')
                }
        }).then(resp => {
            this.showPopUp( resp.data.message + ' - Check Order List', false);
            document.getElementsByClassName('lds-facebook')[0].style.visibility = 'hidden';
        }).catch(err => {
            this.showPopUp(err.message, true);
            document.getElementsByClassName('lds-facebook')[0].style.visibility = 'hidden';
        });
    }

    updateQuantity(changedValueEle) {
        if (['Backspace', 'Delete'].includes(changedValueEle.key)) {
            changedValueEle.preventDefault();
            return;
        }
        let inputDataArray = changedValueEle.target.dataset.updateOrder.split(":");
        let piecePrice = Number(inputDataArray[1]);
        if (changedValueEle.key === 'ArrowUp') {
            let updateWishList = [];
            this.state.wishList.forEach((ele,idx) => {
                if (ele.food === inputDataArray[0] && ele.price === inputDataArray[1]) {
                    ele.quantity = Number(ele.quantity) + 1;
                }
                updateWishList.push(ele);
            });
            this.setState({
                totalAmountPaid: this.state.totalAmountPaid + piecePrice,
                wishList: updateWishList
            });
        } else if (changedValueEle.key === 'ArrowDown' && changedValueEle.target.value > "1") {
            let updateWishList1 = [];
            this.state.wishList.forEach((ele,idx) => {
                if (ele.food === inputDataArray[0] && ele.price === inputDataArray[1]) {
                    ele.quantity = Number(ele.quantity) + 1;
                }
                updateWishList1.push(ele);
            });
            this.setState({
                totalAmountPaid: this.state.totalAmountPaid - piecePrice,
                wishList: updateWishList1
            });
        }
    }

    getOrderFullDetails(selectedOrder) {
        let selectedOrderNo = selectedOrder.dataset.orderNumber;
        let info = {};
        this.state.orderList.forEach(ele => {
            let itemsString = "";
            if (Number(selectedOrderNo) === ele.number) {
                ele.items.forEach(item => {itemsString += item.food + ", ";});
                info.itemsList = itemsString;
                info.total = ele.price;
            }
        });
        this.setState({
            selectedOrderInfo: info,
            clickedOrder: !this.state.clickedOrder
        });
    }

    manipulatePSInfo() {
        let getUserInfo = new CookieHandler();
        let empData = getUserInfo.getObjectFromCookies();
        let panelInfo = {};
        let keysArray = ["name", "orgName", "empId", "email", "mobile"];
        keysArray.forEach(key => {
            panelInfo[key] = empData[key];
        });
        document.getElementsByClassName('lds-facebook')[0].style.visibility = 'visible';

        axios.post('/api/employees/identity',
        {
            empId: empData['empId']
        },
        {
            headers: {
                Authorization: 'Bearer ' + empData['bearerToken']
            }
        })
        .then(resp => {
            panelInfo.imgName = resp.data.imgName;
            this.setState({psInfo: panelInfo});
            document.getElementsByClassName('lds-facebook')[0].style.visibility = 'hidden';
        })
        .catch( err => {
            this.showPopUp(err.message, true);
            document.getElementsByClassName('lds-facebook')[0].style.visibility = 'hidden';
        });
    }

    hidePreviewPanel(show) {
        if (show) {
            this.manipulatePSInfo();
            $('#preview-parent').css({display: 'block'});
            $('#main-process-div').css({'pointer-events': 'none'});
            $('#main-process-div').css({'opacity': 0.5});
        } else {
            $('#preview-parent').css({display: 'none'});
            $('#main-process-div').css({'pointer-events': 'auto'});
            $('#main-process-div').css({'opacity': 1});
        }
    }

    render() {
        return (

        <div id="main-section" >
           <Icon location="center"/>
           <div id='form-replace-div'>
                <Animated animationIn="fadeInDownBig" isVisible={true} style={{zIndex:20, position:'relative'}}>
                    <div id="form-section">
                        <div className="form-controls">
                            <button ref = {this.registerButtonRef} className="entry-button selected-control"
                                    onClick={this.handleRegister}>Sign Up</button>
                            <button ref = {this.loginButtonRef} className="entry-button"
                                    onClick={this.handleLogin}>Login</button>
                        </div>
                        <div className="main-body">
                            <CafeteriaForm isVisible={this.state.showRegisterForm} overlaidId={this.hideFormDiv}
                                showPopUpFunc={this.showPopUp} afterRegister={this.handleLogin}
                                changeAvatar={this.changeAvatar}
                            />
                        </div>
                        <div id="underlay-div"></div>
                    </div>
                </Animated>
                <div className="protect-div"></div>
           </div>

            <div id="preview-parent">
                <PreviewPane hideShowDiv={this.hidePreviewPanel} psInfo={this.state.psInfo}/>
            </div>
           <div id="main-process-div">
                <div className="login-member">
                    <LoginImg userAvatar={this.state.userAvatar} showForm={this.showFormDiv} showPSInfo={this.hidePreviewPanel}/>
                </div>
                <div className="select-item" style={{display:"none"}}>
                    <Animated animationIn="fadeInUpBig" isVisible={true}>
                        <CafeMenu selectCallBack={this.addItemsToOrder}/>
                    </Animated>
                </div>
                <div className="order-item"  style={{display:"none"}}>
                    <Animated animationIn="slideInDown" isVisible={true}>
                        <Wishlist showWishlist={this.state.showList} wishlistOrders={this.state.wishList}
                            updateQuant={this.updateQuantity}
                        />
                        <OrderList showWishlist={!this.state.showList} orders={this.state.orderList}
                            showDetails={this.getOrderFullDetails}
                        />
                    </Animated>
                </div>
                <div id="order-wishlist-nav" style={{display:"none"}}>
                    <div id="nav-div">
                        <button className={"circular-button button-1 " + (this.state.darkenFirstButton ? "button-color" : "")}
                                onClick={this.handleNavigation}></button>
                        <button className={"circular-button button-2 " + (!this.state.darkenFirstButton ?  "button-color" : "")}
                                onClick={this.handleNavigation}></button>
                    </div>
                </div>

                <div className="bottom-div" style={{display:"none"}}>
                    <PlaceOrder showOrderDetails={!this.state.showOrderInfo}
                        wishListItems={this.state.wishList.length > 0 ? true : false}
                        count={this.state.wishList.length}
                        total={this.state.totalAmountPaid}
                        orderManageCallBack={this.orderPlaced}
                    />

                    <OrderDetails showOrderDetails={this.state.showOrderInfo}
                        orderListItems={this.state.clickedOrder}
                        selectedInfo={this.state.selectedOrderInfo}
                    />
                </div>
           </div>



        </div>
        );
    };

}