import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Plate.module.css';

export class HeaderCell extends Component {
  handleClick = () => {
    const { headerType, index } = this.props;
    if (this.props.onClick) {
      this.props.onClick({ headerType, index });
    }
  };
  render() {
    const { label, height, width, padding } = this.props;
    const style = {
      height: height + 'px',
      width: width + 'px',
      padding: padding + 'px',
    };
    return (
      <div style={style} className={styles.headerCell} onClick={this.handleClick}>
        <span>{label}</span>
      </div>
    );
  }
}

HeaderCell.propTypes = {
  headerType: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  padding: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};
