import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react';

import {
  COMPONENT_TYPE_COMPOUND,
  COMPONENT_TYPE_SUPPLEMENT,
} from '../../../constants';
import { ComponentToolTip } from '../../PlateSidebar/ComponentList/ComponentToolTip';

export class WellComponent extends Component {
  renderTimepoints(timepoints) {
    return timepoints.reduce((displayString, timepoint) => {
      if (timepoint.concentration) {
        return `${displayString}(${timepoint.concentration.toFixed(2)}@${
          timepoint.time
        }h)`;
      } else return displayString;
    }, '');
  }
  render() {
    const { component } = this.props;
    // attribute is a special component
    if (component.type === 'attribute') {
      return <div>{`${component.displayName}`}</div>;
    }
    // for rendering of component other than attribute
    else if (
      component.type === COMPONENT_TYPE_COMPOUND ||
      component.type === COMPONENT_TYPE_SUPPLEMENT
    ) {
      return (
        <Popup
          position="top center"
          trigger={
            <div>
              {`${component.displayName}`}{' '}
              {this.renderTimepoints(component.timepoints)}
            </div>
          }
        >
          <Popup.Content>
            <ComponentToolTip component={component} />
          </Popup.Content>
        </Popup>
      );
    } else {
      return (
        <div>
          {`${component.displayName}`} {this.renderTimepoints(component.timepoints)}
        </div>
      );
    }
  }
}

WellComponent.propTypes = {
  component: PropTypes.object.isRequired,
};
