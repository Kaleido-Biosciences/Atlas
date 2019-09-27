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

const renderAttribute = (data) => {
  if (data && data.value){
    return (data.value_unit ? '_' + data.value + data.value_unit : '_' + data.value);
  }
  return '';
};

export class WellComponent extends Component {
  render() {
    const { component } = this.props;
    // attribute is a special component
    if (component.type === 'attribute'){
      return (
        <div>
          {`${component.displayName}`} {renderAttribute(component.data)}
        </div>
      )
    }
    // for rendering of component other than attribute
    return (
      <div>
        {`${component.displayName}`} {renderTimepoints(component.timepoints)}
      </div>
    );
  }
}
