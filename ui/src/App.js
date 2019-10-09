import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { store } from './store/store';
import { Header } from './components/Header/Header';
import { CreateNew } from './pages/create/CreateNew';
import { Statistics } from './pages/statistics';
import styles from './App.module.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <React.Fragment>
            <Header auth={this.props.auth}/>
            <div className={styles.mainContainer}>
              <Switch>
                <Route path="/create" component={CreateNew} />
                <Route path="/statistics" component={Statistics} />
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
