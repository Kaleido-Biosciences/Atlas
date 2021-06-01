import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popup, Icon } from 'semantic-ui-react';

import { ComponentTooltip } from 'AtlasUI/components';
import styles from './ContainerComponent.module.css';

export class ContainerComponent extends Component {
  handleRemoveClick = (e) => {
    if (this.props.onRemove) {
      this.props.onRemove(this.props.component.id);
    }
    e.stopPropagation();
  };
  render() {
    const { component } = this.props;
    const style = {
      background: component.colorCode,
    };
    const renderedComponent = (
      <div className={styles.containerComponent} style={style}>
        <div>
          <div
            className={styles.containerComponentName}
          >{`${component.name}`}</div>
          <div className={styles.containerComponentDescription}>
            {component.description}
          </div>
        </div>
        {this.props.enableRemove ? (
          <div onClick={this.handleRemoveClick}>
            <Icon link name="remove" />
          </div>
        ) : null}
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
}

ContainerComponent.propTypes = {
  component: PropTypes.object.isRequired,
  enableRemove: PropTypes.bool,
  onRemove: PropTypes.func,
};

ContainerComponent.defaultProps = {
  enableRemove: false,
};
