import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor (props) {
    super(props);

    const {store} = props;
    const app = store.getState();
    
    this.state = {app};
    store.subscribe(() => {
      const app = store.getState();
      this.setState({app});
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          It's edited
        </p>
      </div>
    );
  }
}

export default App;
