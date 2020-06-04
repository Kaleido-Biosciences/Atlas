import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { Header } from 'AtlasUI/components';
import { store } from 'FetchApp/store';
import styles from './App.module.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <React.Fragment>
            <Header />
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
