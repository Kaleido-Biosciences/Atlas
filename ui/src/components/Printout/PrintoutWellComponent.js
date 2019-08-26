import React, { Component } from 'react';

const renderTimepoints = timepoints => {
  return timepoints.reduce((displayString, timepoint) => {
    if (timepoint.concentration) {
      return `${displayString}(${timepoint.concentration.toFixed(2)}@${
        timepoint.time
      }h)`;
    } else return displayString;
  }, '');
};

export class WellComponent extends Component {
  render() {
    const { component } = this.props;
    return (
      <div>
        {`${component.displayName}`} {renderTimepoints(component.timepoints)}
      </div>
    );
  }
}
