import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PrintComponent } from './PrintComponent';
import styles from './PrintPosition.module.css';

export class PrintPosition extends Component {
  renderComponents() {
    if (this.props.position.container) {
      return this.props.position.container.components.map((component) => {
        return (
          <PrintComponent key={`PRINT_${component.id}`} component={component} />
        );
      });
    }
  }
  render() {
    const { position, displayContainerType } = this.props;
    let containerType;
    if (position.container) {
      if (displayContainerType) {
        containerType = position.container.containerType;
      }
    }
    return (
      <div className={styles.printPosition}>
        <div className={styles.containerType}>{containerType}</div>
        {this.renderComponents()}
      </div>
    );
  }
}

PrintPosition.propTypes = {
  position: PropTypes.object,
  displayContainerType: PropTypes.bool,
};
