import React, { Component } from 'react';
import SplitPane from 'react-split-pane';

import { ComponentList } from './ComponentList';
import { Tools } from './Tools';
import styles from './PlateSidebar.module.css';

export class PlateSidebar extends Component {
  render() {
    return (
      <div className={styles.plateSidebar}>
        <SplitPane
          split="horizontal"
          defaultSize={250}
          pane2Style={{ height: '100%' }}
        >
          <ComponentList />
          <Tools />
        </SplitPane>
      </div>
    );
  }
}
