import React from 'react';
import sideLogo from '../../appearance/coffee_image.png';
import bgLogo from '../../appearance/coffee_bg.png';
import './icon.css';

export default class Icon extends React.Component {

    constructor(props) {
        super(props);
        this.htmlImgRef = React.createRef();
        this.state = {
            ImageRef: undefined
        };
    }

    render() {
        return (
            <img className="logo" ref={this.htmlImgRef} alt="Coffee Cup Logo"/>
        );
    }

    addAndRemoveClass(clsName) {
        this.state.ImageRef.current.classList.add(clsName);
    }

    locateBackgroundImage () {
        let bgImage = this.state.ImageRef;
        if (this.props.location === 'center') {
            this.addAndRemoveClass('center-icon-class');
            bgImage.current.src = bgLogo;

            let top = 0.5 * (window.innerHeight - bgImage.current.getBoundingClientRect().height);
            let left = 0.5 * (window.innerWidth - bgImage.current.getBoundingClientRect().width);
            bgImage.current.style.top = top + "px";
            bgImage.current.style.left = left + "px";

        } else {

            this.addAndRemoveClass('left-icon-class');
            bgImage.current.src = sideLogo;

        }
    };

    componentDidMount() {
        this.setState((state, props) => {
            state.ImageRef = this.htmlImgRef;
            this.locateBackgroundImage();
        });

        window.addEventListener('resize', () => {
            this.locateBackgroundImage();
        });
    }

}