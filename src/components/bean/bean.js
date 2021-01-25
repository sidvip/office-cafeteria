import React from 'react';
import BeanImg from '../../appearance/bean.png';
import './bean.css';

export default class Bean extends React.Component {

    constructor(props) {
        super(props);
        this.numberOfBeans = 8;
        this.beansArray = new Array(this.numberOfBeans).fill(1);
    }

       render() {
        return (
            <div style={{display: this.props.toShow ? 'block' : 'none'}}>
                 {this.beansArray.map((value, idx) => (
                    <img className="bean-img" id={"bean-" + (idx+1)} src={BeanImg} alt="bean" key={idx}/>
                ))}
            </div>
        );
    }

}

