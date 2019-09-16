import React, { Component } from 'react';

import { ComponentList } from './ComponentList';
import styles from './PlateSidebar.module.css';

export class PlateSidebar extends Component {
  render() {
    return (
      <div className={styles.plateSidebar}>
        <ComponentList />
      </div>
    );
  }
}
