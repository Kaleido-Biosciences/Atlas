import React, { Component } from 'react';
import SplitPane from 'react-split-pane';

import { ComponentList } from './ComponentList';
import { Tools } from './Tools';

export class EditorSidebar extends Component {
  render() {
    return (
      <SplitPane
        split="horizontal"
        defaultSize={250}
        pane2Style={{ overflow: 'hidden' }}
      >
        <ComponentList />
        <Tools />
      </SplitPane>
    );
  }
}
