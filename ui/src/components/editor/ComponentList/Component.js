import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Label, Popup } from 'semantic-ui-react';

import { ComponentTypeCircle } from '../ComponentTypeCircle';
import { ComponentTooltip } from 'AtlasUI/components';
import styles from './ComponentList.module.css';

export class Component extends React.Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick({ component: this.props.component });
    }
  };

  renderComponent() {
    const { component } = this.props;
    const renderedComponent = (
      <div>
        <ComponentTypeCircle
          type={component.type}
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
    const { count } = this.props;
    const componentClass = classNames(styles.component, {
      [styles.notUsed]: !count,
    });
    return (
      <div onClick={this.handleClick} className={componentClass}>
        {this.renderComponent()}
        {count && <Label className={styles.componentLabel}>{count}</Label>}
      </div>
    );
  }
}

Component.propTypes = {
  component: PropTypes.object.isRequired,
  count: PropTypes.number,
  onClick: PropTypes.func,
};
