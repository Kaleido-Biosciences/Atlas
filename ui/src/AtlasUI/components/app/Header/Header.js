import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu, Image } from 'semantic-ui-react';

import styles from './Header.module.css';
const logo = require('./kaleido_logo.png');

export class Header extends Component {
  render() {
    return (
      <Menu fixed="top" inverted className={styles.header}>
        <Menu.Item header position={'left'}>
          <Link to="/" className={styles.headerLink}>
            <Image size="mini" src={logo} className={styles.logo} />
            Atlas
          </Link>
        </Menu.Item>
        <Menu.Item position={'right'}>
          <span className={styles.version}>Version {this.props.version}</span>
        </Menu.Item>
      </Menu>
    );
  }
}

Header.propTypes = {
  version: PropTypes.string,
};
