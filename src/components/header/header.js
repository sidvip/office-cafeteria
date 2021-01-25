import React from 'react';
import Icon from '../icon/icon';
import PageLabel from '../label/label';
import Bean from '../bean/bean';
import './header.css';


export default class Header extends React.Component {
    render() {
        return (
            <div className="header-class">
                <PageLabel labelValue={"Coffee Cafeteria"} type="heading" location="right"/>
                <Icon location="right"/>
                <Bean toShow={true}/>
            </div>
        );
    }
}