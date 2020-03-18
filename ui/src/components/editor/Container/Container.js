import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Container.module.css';

export class Container extends Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick({
        containerId: this.props.container.id,
        positions: null,
      });
    }
  };
  render() {
    const { selected } = this.props.container;
    const containerClass = classNames(styles.container, { selected });
    return <div className={containerClass} onClick={this.handleClick}></div>;
  }
}

Container.propTypes = {
  container: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
