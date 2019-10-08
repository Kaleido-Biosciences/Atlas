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
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        {
          isAuthenticated() &&
          <div className="container column">
            <h1>
              You are logged in!{' '}
              <span
                style={{ cursor: 'pointer', color: 'blue'  }}
                onClick={this.logout}
              >
                Log out
              </span>.
            </h1>
            <App auth={this.props.auth}/>
          </div>
        }
        {
          !isAuthenticated() && (
            <div className="container column">
              <h1>
                You are not logged in! Please{' '}
                <span
                  style={{ cursor: 'pointer', color: 'blue' }}
                  onClick={this.login}
                >
                  Log in
                </span>
                {' '}to continue.
              </h1>
            </div>
          )
        }
      </div>
    );
  }
}

export default Home;
