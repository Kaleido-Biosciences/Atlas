import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './PrintWellComponent.module.css';

const renderTimepoints = timepoints => {
  return timepoints.reduce((displayString, timepoint) => {
    if (timepoint.concentration) {
      return `${displayString}(${timepoint.concentration.toFixed(2)}@${
        timepoint.time
      }h)`;
    } else return displayString;
  }, '');
};

export class PrintWellComponent extends Component {
  render() {
    const { component } = this.props;
    let timepoints = '';
    if (component.type !== 'attribute') {
      timepoints = renderTimepoints(component.timepoints);
    }
    return (
      <div>
        <div className={styles.componentName}>{`${component.displayName}`}</div>
        <div className={styles.timepoints}>{timepoints}</div>
      </div>
    );
  }
}

PrintWellComponent.propTypes = {
  component: PropTypes.object.isRequired,
};
