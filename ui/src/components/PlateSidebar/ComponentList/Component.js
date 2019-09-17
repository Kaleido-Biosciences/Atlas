import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Label } from 'semantic-ui-react';
import { ComponentTypeCircle } from '../ComponentTypeCircle';

import styles from './ComponentList.module.css';

export class Component extends React.Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick({ component: this.props.component });
    }
  };
  render() {
    const { component, count } = this.props;
    const componentClass = classNames(styles.component, {
      [styles.notUsed]: !count,
    });
    return (
      <div onClick={this.handleClick} className={componentClass}>
        <div>
          <ComponentTypeCircle
            type={component.type}
            className={styles.typeCircle}
          />
          {component.displayName}
        </div>
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
