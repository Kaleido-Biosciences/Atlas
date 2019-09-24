import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './PlateTabBar.module.css';

export class PlateTab extends Component {
  handleClick = () => {
    const { plate } = this.props;
    if (this.props.onClick) {
      this.props.onClick(plate.id);
    }
  };
  render() {
    const { plate } = this.props;
    const tabClass = classNames(styles.plateTab, {
      [styles.active]: plate.active,
    });
    return (
      <div className={tabClass} onClick={this.handleClick}>
        <span>{`Plate ${plate.id}`}</span>
      </div>
    );
  }
}

PlateTab.propTypes = {
  plate: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
