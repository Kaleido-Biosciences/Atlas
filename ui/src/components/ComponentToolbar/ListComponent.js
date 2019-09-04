import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './ListComponent.module.css';

export class ListComponent extends Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick({ component: this.props.component });
    }
  };
  render() {
    const { component } = this.props;
    return <div className={styles.listComponent} onClick={this.handleClick}>{component.displayName}</div>;
  }
}

ListComponent.propTypes = {
  component: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
