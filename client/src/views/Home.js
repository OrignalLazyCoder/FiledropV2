import React, { Component } from 'react';
import one from './static/one.png';
import two from './static/two.png'
import three from './static/three.png'
import './css/Home.css'

class Home extends Component {
    render() {
        return (
            <div>
                <div className="imgbox">
                    <img className="center-fit" src={one} />
                </div>
                <div className="imgbox">
                    <img className="center-fit" src={two} /> 
                </div>
                <div className="imgbox">
                    <img className="center-fit" src={three} />
                </div>
            </div>
        );
    }
}

export default Home;