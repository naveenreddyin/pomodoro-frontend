import React, { Component } from 'react';
import logo from '../logo.svg';
import { connect } from 'react-redux'

import Container from './Container'

export class Main extends Component {

    render(){
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Pomodoro App</h1>
                </header>
                <Container/>
            </div>
        );
    } 
}

const mapStateToProps = (state) => {
    return {
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {

    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Main)

