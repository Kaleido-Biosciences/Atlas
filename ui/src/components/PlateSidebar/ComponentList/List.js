import React from 'react';
import PropTypes from 'prop-types';

import { Component } from './Component';

export class List extends React.Component {
  handleComponentClick = ({ component }) => {
    if (this.props.onComponentClick) {
      this.props.onComponentClick({ component });
    }
  };
  renderComponents(components) {
    return components.map(component => {
      return (
        <Component
          key={component.id}
          component={component}
          onClick={this.handleComponentClick}
        />
      );
    });
  }
  render() {
    const { components } = this.props;
    const showComponents = components && components.length;
    return (
      <div>
        {showComponents ? (
          this.renderComponents(components)
        ) : (
          <div>No components</div>
        )}
      </div>
    );
  }
}

List.propTypes = {
  components: PropTypes.array,
  onComponentClick: PropTypes.func,
};
