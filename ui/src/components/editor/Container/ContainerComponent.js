import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react';

import { COMPONENT_TYPE_ATTRIBUTE } from '../../../constants';
import { ComponentTooltip } from 'AtlasUI/components';
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
    const renderedComponent = (
      <div className={styles.containerComponent} style={style}>
        <div
          className={styles.containerComponentName}
        >{`${component.name}`}</div>
        <div className={styles.containerComponentDescription}>
          {component.description}
        </div>
      </div>
    );
    if (component.tooltip.length) {
      return (
        <Popup position="top center" trigger={renderedComponent}>
          <Popup.Content>
            <ComponentTooltip tooltip={component.tooltip} />
          </Popup.Content>
        </Popup>
      );
    } else {
      return renderedComponent;
    }
  }
  render() {
    const { component } = this.props;
    if (component.type === COMPONENT_TYPE_ATTRIBUTE) {
      return this.renderAttribute(component);
    } else {
      return this.renderComponent(component);
    }
  }
}

ContainerComponent.propTypes = {
  component: PropTypes.object.isRequired,
};
