import React, { Component } from 'react';

import styles from './Tools.module.css';

export class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <div className={styles.headerContent}>Tools</div>
      </div>
    );
  }
}
