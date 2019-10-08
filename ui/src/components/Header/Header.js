import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Image } from 'semantic-ui-react';

import styles from './Header.module.css';
const logo = require('./kaleido_logo.png');

export class Header extends Component {
  static getUserInfo(){
    let id_token = localStorage.getItem('id_token');
    let base64Url = id_token.split('.')[1];
    let decodedValue = JSON.parse(window.atob(base64Url));
    return decodedValue.username;
  }

  render() {
    return (
      <Menu fixed="top" inverted className={styles.header}>
        <Menu.Item header position={'left'}>
          <Link to="create/select" className={styles.headerLink}>
            <Image size="mini" src={logo} className={styles.logo} />
            Atlas
          </Link>
        </Menu.Item>
        <Menu.Item>
          Welcome! You are logged in as {Header.getUserInfo()}.
        </Menu.Item>
        <Menu.Item position={'right'}
            onClick={this.props.auth.logout}
          >
            Log Out
        </Menu.Item>
      </Menu>
    );
  }
}
