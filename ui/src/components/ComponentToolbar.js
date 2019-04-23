import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';

const panes = [
  {
    menuItem: 'Select',
    render: () => <Tab.Pane attached={false}>Select Toolbar</Tab.Pane>,
    modeName: 'select',
  },
  {
    menuItem: 'Apply',
    render: () => <Tab.Pane attached={false}>Apply Toolbar</Tab.Pane>,
    modeName: 'apply',
  },
];

export class ComponentToolbar extends Component {
  handleTabChange = (e, data) => {
    const { activeIndex, panes } = data;
    const modeName = panes[activeIndex].modeName;
    this.props.onTabChange(modeName);
  };
  render() {
    return (
      <div className="component-toolbar">
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
  onTabChange: PropTypes.func.isRequired,
};
