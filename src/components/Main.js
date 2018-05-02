import React, { Component } from 'react';
import logo from '../logo.svg';
import { connect } from 'react-redux'


class Main extends Component {

    render(){
        return (
            <div className="App">
                <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to Pomodoro App</h1>
                </header>
                
                <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload. {process.env.NODE_ENV}
                </p>
                
            </div>
        );
    } 
}

const mapStateToProps = (state) => {
    return {
      fetching: state.user.fetching,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {

    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Main)

