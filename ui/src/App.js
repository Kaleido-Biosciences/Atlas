import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { store } from './store/store';
import { Header } from './components/app/Header';
import { Home } from './routes/home';
import { Activity } from './routes/activity';
import styles from './App.module.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <React.Fragment>
            <Header />
            <div className={styles.mainContainer}>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route
                  path="/activities/:activityId"
                  component={Activity}
                />
                <Route component={() => <Redirect to="/" />} />
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
