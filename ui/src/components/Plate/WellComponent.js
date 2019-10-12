import React, { Component } from 'react';
import {Popup} from "semantic-ui-react";
import {ComponentToolTip} from "../PlateSidebar/ComponentList/ComponentToolTip";

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
    // attribute is a special component
    if (component.type === 'attribute'){
      return (
        <div>
          {`${component.displayName}`}
        </div>
      )
    }
    // for rendering of component other than attribute
    else if (component.type === 'compound' || component.type === 'supplement') {
      return (
        <Popup
          position='top center'
          trigger={
            <div>
              {`${component.displayName}`} {renderTimepoints(component.timepoints)}
            </div>
          }>
          <Popup.Content> <ComponentToolTip component={component}/> </Popup.Content>
        </Popup>
      )
    } else {
      return (
        <div>
          {`${component.displayName}`} {renderTimepoints(component.timepoints)}
        </div>
      )
    }
  }
}
