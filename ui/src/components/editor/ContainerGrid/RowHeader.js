import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PLATE_ROW_HEADERS, PLATE_HEADER_SIZE } from '../../../constants';
import { HeaderCell } from './HeaderCell';
import styles from './ContainerGrid.module.css';

export class RowHeader extends Component {
  divRef = React.createRef();
  setScrollPos = scrollPos => {
    this.divRef.current.scrollTop = scrollPos;
  };
  handleCellClick = ({ headerType, index }) => {
    if (this.props.onClick) {
      // const { plate } = this.props;
      // const row = plate.wells[index];
      // const wellIds = row.map(well => well.id);
      // this.props.onClick({
      //   wellIds,
      // });
    }
  };
  render() {
    const { numberOfRows, containerSize } = this.props;
    const style = {
      height: containerSize.size + 'px',
      width: PLATE_HEADER_SIZE + 'px',
      padding: `${containerSize.padding}px 0`,
    };
    const cells = [];
    for (let i = 0; i < numberOfRows; i++) {
      cells.push(
        <HeaderCell
          key={PLATE_ROW_HEADERS[i]}
          index={i}
          label={PLATE_ROW_HEADERS[i]}
          style={style}
          onClick={this.handleCellClick}
        />
      );
    }
    return (
      <div ref={this.divRef} className={styles.rowHeader}>
        {cells}
      </div>
    );
  }
}

RowHeader.propTypes = {
  numberOfRows: PropTypes.number,
  containerSize: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
