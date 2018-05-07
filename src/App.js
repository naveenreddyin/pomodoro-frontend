import React, { Component } from 'react';
import Main from './components/Main';
import './App.css';
import { Provider } from 'react-redux'
import createStore from './redux'
import applyConfigSettings from './config'

// Apply config overrides
applyConfigSettings()

const store = createStore()

class App extends Component {
  render() {

    return (
      <Provider store={store}>
          <Main/>
      </Provider>
      
    );
  }
}

export default App;
