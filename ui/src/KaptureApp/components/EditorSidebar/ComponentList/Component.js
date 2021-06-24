import React from 'react';
import PropTypes from 'prop-types';

import { ComponentTooltip, ComponentTypeCircle } from 'AtlasUI/components';
import styles from './ComponentList.module.css';

export class Component extends React.Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.component);
    }
  };
  render() {
    const { component } = this.props;
    const divProps = {
      className: styles.content,
    };
    if (component.tooltip.length) {
      divProps['data-tip'] = true;
      divProps['data-for'] = `list-component-${component.id}`;
    }
    return (
      <div className={styles.component} onClick={this.handleClick}>
        <div {...divProps}>
          <ComponentTypeCircle
            className={styles.typeCircle}
            color={component.color}
            text={component.abbreviation}
          />
          {component.name}
        </div>
        {component.tooltip.length > 0 && (
          <ComponentTooltip
            id={`list-component-${component.id}`}
            tooltip={component.tooltip}
          />
        )}
      </div>
    );
  }
}

Component.propTypes = {
  component: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
