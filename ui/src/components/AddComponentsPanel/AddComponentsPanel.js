import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';

import { ImportComponents } from './ImportComponents';
import styles from './AddComponentsPanel.module.css';

const panes = [
  {
    menuItem: 'Import',
    render: () => (
      <Tab.Pane attached={false}>
        <ImportComponents />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Search',
    render: () => <Tab.Pane attached={false}>Search here.</Tab.Pane>,
  },
];

export class AddComponentsPanel extends Component {
  render() {
    return (
      <div className={styles.addComponentsPanel}>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </div>
    );
  }
}
