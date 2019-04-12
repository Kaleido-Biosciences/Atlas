import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { TopBar } from './components/TopBar';
import { NewExperimentPage } from './pages/NewExperimentPage';

class App extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <Switch>
          <Route path="/create/new" exact component={NewExperimentPage} />
          <Route render={() => <Redirect to="/create/new" />} />
        </Switch>
      </div>
    );
  }
}

export default App;
