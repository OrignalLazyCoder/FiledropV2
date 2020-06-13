import React, { Component } from 'react';
import './css/Index.css'
import { BrowserRouter as Router, Route, Link,withRouter } from "react-router-dom";
import Home from './Home';
import Faq from './Faq';
import Drive from './Drive';
import UserActicty from './UserActivity';
import icon from './static/icon.png'


class Index extends Component {

    constructor(props){
        super(props);
        this.state = {
            count : 0
        }
    }

    updateCount = () => {
        this.setState({
            count : this.state.count + 1
        })
    }

    render() {
        return (
            <Router>
                <div className="navigation">
                <ul>
                    <li><img src={icon} width={'80px'} height={'80px'}/></li>
                    <li onClick={this.updateCount}><a><Link to='/'>Home</Link></a></li>
                    <li onClick={this.updateCount}><a><Link to='/faq'>Faq</Link></a></li>
                    <li onClick={this.updateCount}><a><Link to='/myDrive'>My Drive</Link></a></li>
                    <li onClick={this.updateCount}><a><Link to='/userActivity'>User Activities</Link></a></li>
                </ul> 
                </div>
                <div id="#">
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/faq' component={Faq}/>
                    <Route exact path='/myDrive' component={() => <Drive count={this.state.count}/>}/>
                    <Route exact path='/userActivity' component={() => <UserActicty count={this.state.count}/>} props/>
                </div>
            </Router>
        );
    }
}

export default Index;