import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PLATE_ROW_HEADERS } from '../../constants';
import { Well } from './Well';
import { PlateHeader } from './PlateHeader';
import styles from './Plate.module.css';

export class Plate extends Component {
  renderTable(wells) {
    const rows = wells.map((row, i) => {
      const columns = row.map((well, j) => {
        return (
          <td key={j + 1}>
            <Well onClick={this.handleWellClick} well={well} />
          </td>
        );
      });
      columns.unshift(
        <PlateHeader
          headerType="row"
          label={PLATE_ROW_HEADERS[i]}
          key={0}
          index={i}
          onClick={this.handleHeaderClick}
          className="row"
        />
      );
      return <tr key={i + 1}>{columns}</tr>;
    });

    const topHeaderCells = wells[0].map((well, i) => {
      return (
        <PlateHeader
          headerType="column"
          label={i + 1}
          key={i + 1}
          index={i}
          onClick={this.handleHeaderClick}
          className="column"
        />
      );
    });
    topHeaderCells.unshift(<td key="blank" />);
    rows.unshift(<tr key="topHeader">{topHeaderCells}</tr>);
    return (
      <div className={styles.container}>
        <table className={styles.plate}>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
  handleHeaderClick = ({ headerType, index }) => {
    const { plate } = this.props;
    let wellIds;
    if (headerType === 'row') {
      const row = plate.wells[index];
      wellIds = row.map(well => well.id);
    } else {
      wellIds = plate.wells.map(row => row[index].id);
    }
    this.props.onWellsClick({
      plateId: this.props.plate.id,
      wellIds,
    });
  };
  handleWellClick = well => {
    this.props.onWellsClick({
      plateId: this.props.plate.id,
      wellIds: [well.id],
    });
  };
  render() {
    const { plate } = this.props;
    return <div>{this.renderTable(plate.wells)}</div>;
  }
}

Plate.propTypes = {
  plate: PropTypes.object.isRequired,
  onWellsClick: PropTypes.func.isRequired,
};
