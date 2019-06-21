import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { store } from './store/store';
import { Header } from './components/Header';
import { CreateNew } from './pages/create/CreateNew';
const logo = require('./images/kaleido_logo.png');

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <React.Fragment>
            <Header logo={logo} />
            <div className="main-container">
              <Switch>
                <Route path="/create" component={CreateNew} />
                <Route render={() => <Redirect to="/create/select" />} />
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
