import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';

import { ApplyToolbar } from './ApplyToolbar';
import { SelectToolbar } from './SelectToolbar';
import { ClearToolbar } from './ClearToolbar';
import styles from './ComponentToolbar.module.css';

export class ComponentToolbar extends Component {
  getPanes = () => {
    return [
      {
        menuItem: 'Apply',
        render: () => (
          <Tab.Pane attached={false}>
            <ApplyToolbar onAddComponent={this.props.onAddComponent} />
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
  };
  handleTabChange = (e, data) => {
    const { activeIndex, panes } = data;
    const modeName = panes[activeIndex].modeName;
    this.props.onTabChange(modeName);
  };
  render() {
    return (
      <div className={styles.componentToolbar}>
        <Tab
          onTabChange={this.handleTabChange}
          defaultActiveIndex={0}
          menu={{ pointing: true }}
          panes={this.getPanes()}
        />
      </div>
    );
  }
}

ComponentToolbar.propTypes = {
  onAddComponent: PropTypes.func.isRequired,
  onTabChange: PropTypes.func.isRequired,
};
