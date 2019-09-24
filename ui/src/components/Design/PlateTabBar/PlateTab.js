import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    return (
      <div
        className={styles.plateTab}
        onClick={this.handleClick}
      >{`Plate ${plate.id}`}</div>
    );
  }
}

PlateTab.propTypes = {
  plate: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
