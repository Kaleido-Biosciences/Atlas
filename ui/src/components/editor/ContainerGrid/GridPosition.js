import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './ContainerGrid.module.css';

export class GridPosition extends Component {
  render() {
    const { size, padding } = this.props.settings.containerSize;
    const style = {
      height: size + 'px',
      width: size + 'px',
      padding: padding + 'px',
    };
    return (
      <div className={styles.gridPositionContainer} style={style}>
        <div className={styles.gridPosition}></div>
      </div>
    );
  }
}

GridPosition.propTypes = {
  settings: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
