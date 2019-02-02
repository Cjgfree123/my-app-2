import React, { Component } from 'react';
import './App.less';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';

class App extends Component {
    render() {
        return (
            <div id="app">
                <Header />    
                <SideMenu/>    
                <div id="content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default App;
