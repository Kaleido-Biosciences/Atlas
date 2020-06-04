import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Header } from 'AtlasUI/components';
import styles from './App.module.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
