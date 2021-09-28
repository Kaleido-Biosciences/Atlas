import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './PlateGrid.module.css';

export class HeaderCell extends Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.index);
    }
  };
  render() {
    const style = {
      height: `${this.props.height}px`,
      width: `${this.props.width}px`,
      padding: `${this.props.yPadding}px ${this.props.xPadding}px`,
    };
    return (
      <div style={style} className={styles.headerCellContainer}>
        <div className={styles.headerCell} onClick={this.handleClick}>
          <span className="text-xs text-gray-600 font-semibold">
            {this.props.label}
          </span>
        </div>
      </div>
    );
  }
}

HeaderCell.propTypes = {
  height: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  width: PropTypes.number.isRequired,
  xPadding: PropTypes.number.isRequired,
  yPadding: PropTypes.number.isRequired,
};
