import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { Header } from './components/Header';
import { NewExperimentPage } from './pages/NewExperimentPage';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Container style={{ marginTop: '7em' }}>
          <Switch>
            <Route path="/create/new" exact component={NewExperimentPage} />
            <Route render={() => <Redirect to="/create/new" />} />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;
