import React, { Component } from 'react';
import App from './App';

class Home extends Component {
  // calls the login method in authentication service
  login = () => {
    this.props.auth.login();
  };
  // calls the logout method in authentication service
  logout = () => {
    this.props.auth.logout();
  };

  render() {
    // calls the isAuthenticated method in authentication service
    const {isAuthenticated} = this.props.auth;
    if (isAuthenticated()) {
      return (<App auth={this.props.auth}/>);
    } else return (
      <div className="container column">
        <h1>
          You are not logged in! Please{' '}
          <span
            style={{cursor: 'pointer', color: 'blue'}}
            onClick={this.login}
          >Log in</span>
          {' '}to continue.
        </h1>
      </div>
    );
  }
}

export default Home;
