import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from 'store';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { version } from '../../package.json';
import { Header } from './Header';
import { Home, Activities } from 'routes';
import styles from './App.module.css';

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <React.Fragment>
            <div className={styles.headerContainer}>
              <Header version={version} />
            </div>
            <div className={styles.mainContainer}>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/activities/:activityId" component={Activities} />
                <Route component={() => <Redirect to="/" />} />
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}
