import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Header } from './components/Header';
import { CreateNew } from './pages/create/CreateNew';
const logo = require('./images/kaleido_logo.png');

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header logo={logo} />
        <div className="main-container">
          <Switch>
            <Route path="/create" component={CreateNew} />
            <Route render={() => <Redirect to="/create/select" />} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
