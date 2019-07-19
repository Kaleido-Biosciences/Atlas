import React, { Component } from 'react';

const renderTimepoints = timepoints => {
  return timepoints.reduce((displayString, timepoint) => {
    return `${displayString}(${timepoint.concentration}@${timepoint.time}h)`;
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
