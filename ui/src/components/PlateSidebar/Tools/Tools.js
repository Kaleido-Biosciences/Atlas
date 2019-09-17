import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';

import { Header } from './Header';
import styles from './Tools.module.css';

export class Tools extends Component {
  render() {
    return (
      <div>
        <Header />
        <Menu size="mini" className={styles.menu}>
          <Menu.Item name="apply">
            <Icon name="paint brush" />
          </Menu.Item>

          <Menu.Item name="select">
            <Icon name="expand" />
          </Menu.Item>

          <Menu.Item name="clear">
            <Icon name="eraser" />
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
