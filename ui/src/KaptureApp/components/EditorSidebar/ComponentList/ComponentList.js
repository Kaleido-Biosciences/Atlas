import React from 'react';
import PropTypes from 'prop-types';

import { Component } from './Component';
import styles from './ComponentList.module.css';

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
      <div className={styles.componentList}>
        {showComponents ? (
          this.renderComponents(components)
        ) : (
          <div className={styles.noComponentsMessage}>
            No components to display.
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
