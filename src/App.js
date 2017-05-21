import React, { Component } from 'react';
import FlexContainer from './components/FlexContainer';
import Header from './components/Header';
import Footer from './components/Footer';
import Toolbar from './components/Toolbar';
import Drawer from './components/Drawer';
import Designer from './components/Designer';
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
      <FlexContainer fill>
        <Header />
        <FlexContainer flexDirection='row' fill>
          <Toolbar />
          <Drawer />
          <Designer />
          <Drawer />
          <Toolbar />
        </FlexContainer>
        <Footer />
      </FlexContainer>
    );
  }
}

export default App;
