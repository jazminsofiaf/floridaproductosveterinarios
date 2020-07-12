import React from 'react';
import logo from './logo.svg';
import './IconAnimation.css';

class IconAnimation extends React.Component{
    render() {
        return (
            <img src={logo} height={this.props.height} width={this.props.width} className="App-logo" alt="logo" />
        );
    }
}

export default IconAnimation;
