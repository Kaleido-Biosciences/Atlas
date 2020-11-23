import React from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react';

import { ComponentTooltip, ComponentTypeCircle } from 'AtlasUI/components';
import styles from './Components.module.css';

export class Component extends React.Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.component);
    }
  };
  renderComponent() {
    const { component } = this.props;
    const renderedComponent = (
      <div>
        <ComponentTypeCircle
          color={component.color}
          text={component.abbreviation}
          className={styles.typeCircle}
        />
        {component.name}
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
    return (
      <div onClick={this.handleClick} className={styles.component}>
        {this.renderComponent()}
      </div>
    );
  }
}

Component.propTypes = {
  component: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
