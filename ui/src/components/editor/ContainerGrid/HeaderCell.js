import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './ContainerGrid.module.css';

export class HeaderCell extends Component {
  handleClick = () => {
    const { index } = this.props;
    if (this.props.onClick) {
      this.props.onClick({ index });
    }
  };
  render() {
    const { label, style } = this.props;
    return (
      <div style={style} className={styles.headerCellContainer}>
        <div className={styles.headerCell} onClick={this.handleClick}>
          <span>{label}</span>
        </div>
      </div>
    );
  }
}

HeaderCell.propTypes = {
  index: PropTypes.number.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  onClick: PropTypes.func,
};
