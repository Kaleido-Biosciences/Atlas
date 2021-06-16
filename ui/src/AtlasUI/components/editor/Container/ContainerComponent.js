import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

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
    const { component, position } = this.props;
    const divProps = {
      className: styles.containerComponent,
      style: {
        background: component.colorCode,
      },
    };
    const stringPosition = `${position.row}${position.column}`;
    if (component.tooltip.length) {
      divProps['data-tip'] = true;
      divProps['data-for'] = `${stringPosition}-${component.id}`;
    }
    return (
      <div className={styles.wrapper}>
        <div {...divProps}>
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
        {component.tooltip.length > 0 && (
          <ComponentTooltip
            id={`${stringPosition}-${component.id}`}
            tooltip={component.tooltip}
          />
        )}
      </div>
    );
  }
}

ContainerComponent.propTypes = {
  component: PropTypes.object.isRequired,
  enableRemove: PropTypes.bool,
  onRemove: PropTypes.func,
  position: PropTypes.object.isRequired,
};

ContainerComponent.defaultProps = {
  enableRemove: false,
};
