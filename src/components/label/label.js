import React from 'react';
import './label.css';

export default function PageLabel (props) {
    let classValue = "";
    let labelValue = "";

    if (props) {
        labelValue = props.labelValue;
        if (props.type === 'heading') {
            classValue = 'heading-class';
        } else if (props.type === 'sub-heading') {
            classValue = 'sub-heading-class';
        }
        if (props.location === 'left') {
            classValue += ' left-class';
        } else if (props.location === 'right') {
            classValue += ' right-class';
        }
    }

    return <label className = {'normal-class ' + classValue}> {labelValue} </label>;
};