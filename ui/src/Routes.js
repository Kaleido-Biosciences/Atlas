import React from 'react';
import { Route, Router } from 'react-router-dom';
import Home from './Home';
import Callback from './Callback';
import Auth from './api/auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/\?code=/.test(nextState.location.search)) {
    let query = nextState.location.search;
    console.log(query);
    query = query.substring(0, query.indexOf('&'));
    let code = query.replace('?code=', '');
    let p = auth.awsCallTokenEndpoint('authorization_code', code);
    p.then((response)=> {
      console.log(response);
      auth.setSession(response.data);
      history.replace('/home');
    })
      .catch((error)=>{
        console.log(error);
        history.replace('/home');
      });
  }
};

const Routes = () => (
  <Router history={history} component={Home}>
      <Route exact path="/" render={(props) => <Home auth={auth} {...props} />} />
      <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
      <Route path="/callback" render={(props) => {
        handleAuthentication(props);
        return <Callback {...props} />
      }}/>
  </Router>
);

export default Routes;