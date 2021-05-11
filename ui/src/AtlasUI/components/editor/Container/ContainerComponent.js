import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react';

import { ComponentTooltip } from 'AtlasUI/components';
import styles from './ContainerComponent.module.css';

export class ContainerComponent extends Component {
  renderComponent(component) {
    const style = {
      background: component.colorCode,
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
    return this.renderComponent(component);
  }
}

ContainerComponent.propTypes = {
  component: PropTypes.object.isRequired,
};
