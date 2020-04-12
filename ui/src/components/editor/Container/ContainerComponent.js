import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react';

import {
  COMPONENT_TYPE_COMPOUND,
  COMPONENT_TYPE_SUPPLEMENT,
  COMPONENT_TYPE_ATTRIBUTE,
} from '../../../constants';
import { ComponentToolTip } from '../ComponentToolTip';
import styles from './ContainerComponent.module.css';

export class ContainerComponent extends Component {
  renderAttribute(attribute) {
    const { key, value, value_unit } = attribute.data;
    const style = {
      background: attribute.color,
    };
    return (
      <div className={styles.containerComponent} style={style}>
        <div className={styles.attributeText}>
          <span>{`${key}:`}</span>
          <span
            className={styles.attributeValue}
          >{` ${value} ${value_unit}`}</span>
        </div>
      </div>
    );
  }
  renderComponent(component) {
    const style = {
      background: component.color,
    };
    return (
      <div className={styles.containerComponent} style={style}>
        <div
          className={styles.containerComponentName}
        >{`${component.name}`}</div>
        <div className={styles.containerComponentDescription}>
          {component.description}
        </div>
      </div>
    );
  }
  render() {
    const { component } = this.props;
    if (component.type === COMPONENT_TYPE_ATTRIBUTE) {
      return this.renderAttribute(component);
    } else if (
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

ContainerComponent.propTypes = {
  component: PropTypes.object.isRequired,
};
