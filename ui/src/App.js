import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { Header } from './components/Header';
import { CreateNew } from './pages/create/CreateNew';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Container style={{ marginTop: '5em' }}>
          <Switch>
            <Route path="/create" component={CreateNew} />
            <Route render={() => <Redirect to="/create/select" />} />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;
