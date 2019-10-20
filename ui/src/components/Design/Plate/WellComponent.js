import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react';

import {
  COMPONENT_TYPE_COMPOUND,
  COMPONENT_TYPE_SUPPLEMENT,
} from '../../../constants';
import { ComponentToolTip } from '../ComponentToolTip';
import styles from './Plate.module.css';

export class WellComponent extends Component {
  renderTimepoints(timepoints) {
    const timepointStrings = timepoints.map(timepoint => {
      if (timepoint.concentration) {
        return `${timepoint.concentration.toFixed(2)} @ 
              ${timepoint.time}h`;
      } else return '';
    });
    return timepointStrings.join(', ');
  }
  getComponentColor(component) {
    const { componentColors } = this.props;
    if (componentColors[component.type]) {
      return componentColors[component.type];
    } else return componentColors.default;
  }
  renderComponent(component) {
    const style = {
      background: this.getComponentColor(component),
    };
    return (
      <div className={styles.wellComponent} style={style}>
        <div
          className={styles.wellComponentName}
        >{`${component.displayName}`}</div>
        <div className={styles.wellComponentTimepoints}>
          {this.renderTimepoints(component.timepoints)}
        </div>
      </div>
    );
  }
  renderAttribute(attribute) {
    const { key, value, value_unit } = attribute.data;
    const style = {
      background: this.getComponentColor(attribute),
    };
    return (
      <div className={styles.wellComponent} style={style}>
        <div className={styles.attributeText}>
          <span>{`${key}:`}</span>
          <span
            className={styles.attributeValue}
          >{` ${value} ${value_unit}`}</span>
        </div>
      </div>
    );
  }
  render() {
    const { component } = this.props;
    // attribute is a special component
    if (component.type === 'attribute') {
      return this.renderAttribute(component);
    }
    // for rendering of component other than attribute
    else if (
      component.type === COMPONENT_TYPE_COMPOUND ||
      component.type === COMPONENT_TYPE_SUPPLEMENT
    ) {
      return (
        <Popup position="top center" trigger={this.renderComponent(component)}>
          <Popup.Content>
            <ComponentToolTip component={component} />
          </Popup.Content>
        </Popup>
      );
    } else {
      return this.renderComponent(component);
    }
  }
}

WellComponent.propTypes = {
  component: PropTypes.object.isRequired,
  componentColors: PropTypes.object.isRequired,
};
