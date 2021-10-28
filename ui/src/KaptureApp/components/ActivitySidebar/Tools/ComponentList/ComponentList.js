import React from 'react';
import PropTypes from 'prop-types';
import { Component } from './Component';

export class ComponentList extends React.Component {
  handleComponentClick = (component) => {
    if (this.props.onComponentClick) {
      this.props.onComponentClick(component);
    }
  };
  renderComponents(components) {
    return components.map((component) => {
      return (
        <Component
          component={component}
          key={component.id}
          onClick={this.handleComponentClick}
        />
      );
    });
  }
  render() {
    const { components } = this.props;
    const showComponents = components && components.length;
    return (
      <div className="px-3 pt-1">
        {showComponents ? (
          this.renderComponents(components)
        ) : (
          <div className="p-4 text-center text-gray-400 w-full">
            No components found.
          </div>
        )}
      </div>
    );
  }
}

ComponentList.propTypes = {
  components: PropTypes.array,
  onComponentClick: PropTypes.func,
};
