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
  render() {
    const { plate, wellSize } = this.props;
    const firstRow = plate.wells[0];
    const cells = firstRow.map((column, i) => {
      return (
        <HeaderCell
          key={i}
          headerType="column"
          index={i}
          label={i + 1}
          height={PLATE_HEADER_SIZE}
          width={wellSize.size}
          padding={wellSize.padding}
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
};
