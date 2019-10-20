import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PLATE_HEADER_SIZE } from '../../../constants';
import { HeaderCell } from './HeaderCell';
import styles from './Plate.module.css';

export class ColumnHeader extends Component {
  divRef = React.createRef();
  setScrollPos = scrollPos => {
    this.divRef.current.scrollLeft = scrollPos;
  };
  handleCellClick = ({ index }) => {
    if (this.props.onClick) {
      const { plate } = this.props;
      const wellIds = plate.wells.map(row => row[index].id);
      this.props.onClick({
        wellIds,
      });
    }
  };
  render() {
    const { plate, wellSize } = this.props;
    const style = {
      height: PLATE_HEADER_SIZE + 'px',
      width: wellSize.size + 'px',
      padding: `0 ${wellSize.padding}px`
    };
    const cells = plate.wells[0].map((column, i) => {
      return (
        <HeaderCell
          key={i}
          index={i}
          label={i + 1}
          style={style}
          onClick={this.handleCellClick}
        />
      );
    });
    return (
      <div ref={this.divRef} className={styles.columnHeader}>
        {cells}
      </div>
    );
  }
}

ColumnHeader.propTypes = {
  plate: PropTypes.object.isRequired,
  wellSize: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
