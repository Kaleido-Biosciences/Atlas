import React from 'react';
import PropTypes from 'prop-types';

import { Component } from './Component';
import styles from './ComponentList.module.css';

export class List extends React.Component {
  handleComponentClick = ({ component }) => {
    if (this.props.onComponentClick) {
      this.props.onComponentClick({ component });
    }
  };
  renderComponents(components, counts) {
    return components.map(component => {
      return (
        <Component
          key={component.id}
          component={component}
          onClick={this.handleComponentClick}
          count={counts[component.id]}
        />
      );
    });
  }
  render() {
    const { components, counts } = this.props;
    const showComponents = components && components.length;
    return (
      <div>
        {showComponents ? (
          this.renderComponents(components, counts)
        ) : (
          <div className={styles.noComponentsMessage}>Get started by adding some components.</div>
        )}
      </div>
    );
  }
}

List.propTypes = {
  components: PropTypes.array,
  counts: PropTypes.object,
  onComponentClick: PropTypes.func,
};
