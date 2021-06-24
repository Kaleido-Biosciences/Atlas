import React, { Component } from 'react';
import SplitPane from 'react-split-pane';

import { Components } from './Components';
import { Tools } from './Tools';

export class EditorSidebar extends Component {
  render() {
    return (
      <SplitPane
        split="horizontal"
        defaultSize={250}
        pane2Style={{ overflow: 'hidden' }}
      >
        <Components />
        <Tools />
      </SplitPane>
    );
  }
}
