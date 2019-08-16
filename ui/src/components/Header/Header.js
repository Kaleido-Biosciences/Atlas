import React, { Component } from 'react';
import { Menu, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import styles from './Header.module.css';

export class Header extends Component {
  render() {
    const { logo } = this.props;
    return (
      <Menu fixed="top" inverted className={styles.header}>
        <Menu.Item header>
          <Image size="mini" src={logo} className={styles.logo} />
          Atlas
        </Menu.Item>
      </Menu>
    );
  }
}

Header.propTypes = {
  logo: PropTypes.string,
};
