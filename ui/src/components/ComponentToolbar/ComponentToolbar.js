import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';

import { ApplyToolbar } from './ApplyToolbar';
import { SelectToolbar } from './SelectToolbar';
import { ClearToolbar } from './ClearToolbar';
import { ComponentSearch } from './ComponentSearch';
import styles from './ComponentToolbar.module.css';

const panes = [
  {
    menuItem: 'Apply',
    render: () => (
      <Tab.Pane attached={false}>
        <ApplyToolbar />
      </Tab.Pane>
    ),
    modeName: 'apply',
  },
  {
    menuItem: 'Select',
    render: () => (
      <Tab.Pane attached={false}>
        <SelectToolbar />
      </Tab.Pane>
    ),
    modeName: 'select',
  },
  {
    menuItem: 'Clear',
    render: () => (
      <Tab.Pane attached={false}>
        <ClearToolbar />
      </Tab.Pane>
    ),
    modeName: 'clear',
  },
];

export class ComponentToolbar extends Component {
  handleTabChange = (e, data) => {
    const { activeIndex, panes } = data;
    const modeName = panes[activeIndex].modeName;
    this.props.onTabChange(modeName);
  };
  render() {
    const { onAddComponent } = this.props;
    return (
      <div className={styles.componentToolbar}>
        <div className={styles.componentSearchContainer}>
          <ComponentSearch onSelect={onAddComponent} />
        </div>
        <Tab
          onTabChange={this.handleTabChange}
          defaultActiveIndex={0}
          menu={{ pointing: true }}
          panes={panes}
        />
      </div>
    );
  }
}

ComponentToolbar.propTypes = {
  onAddComponent: PropTypes.func.isRequired,
  onTabChange: PropTypes.func.isRequired,
};
