import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
        <div>{component.displayName}</div>
        {count && <div>{count}</div>}
      </div>
    );
  }
}

Component.propTypes = {
  component: PropTypes.object.isRequired,
  count: PropTypes.number,
  onClick: PropTypes.func,
};
