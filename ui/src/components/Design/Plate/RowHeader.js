import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PLATE_ROW_HEADERS, PLATE_HEADER_SIZE } from '../../../constants';
import { HeaderCell } from './HeaderCell';
import styles from './Plate.module.css';

export class RowHeader extends Component {
  divRef = React.createRef();
  setScrollPos = scrollPos => {
    this.divRef.current.scrollTop = scrollPos;
  };
  render() {
    const { plate, wellSize } = this.props;
    const rows = plate.wells;
    const cells = rows.map((row, i) => {
      const label = PLATE_ROW_HEADERS[i];
      return (
        <HeaderCell
          key={label}
          headerType="row"
          index={i}
          label={PLATE_ROW_HEADERS[i]}
          height={wellSize.size}
          width={PLATE_HEADER_SIZE}
          padding={wellSize.padding}
        />
      );
    });
    return (
      <div ref={this.divRef} className={styles.rowHeader}>
        {cells}
      </div>
    );
  }
}

RowHeader.propTypes = {
  plate: PropTypes.object.isRequired,
  wellSize: PropTypes.object.isRequired,
};
