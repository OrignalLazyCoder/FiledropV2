import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

try{
    window.ethereum.on('accountsChanged', function (accounts) {
        // Time to reload your interface with accounts[0]!
        ReactDOM.render(<App />, document.getElementById('root'));
      })
}catch{
    alert("Please install metamask in your browser or use Brave browser")
}

try{
    if(window.ethereum){
        ReactDOM.render(<App />, document.getElementById('root'));
    }
}catch{
    alert("Please install metamask in your browser or use Brave browser")
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
