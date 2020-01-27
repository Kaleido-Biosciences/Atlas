import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PLATE_ROW_HEADERS } from '../../constants';
import { PrintWell } from './PrintWell';
import { PrintHeader } from './PrintHeader';
import styles from './Printout.module.css';

export class Printout extends Component {
  renderTable(plate) {
    const rows = plate.map((row, i) => {
      const columns = row.map((well, j) => {
        return (
          <td key={j + 1}>
            <PrintWell well={well} />
          </td>
        );
      });
      columns.unshift(
        <PrintHeader
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

    const topHeaderCells = plate[0].map((well, i) => {
      return (
        <PrintHeader
          headerType="column"
          label={i + 1}
          key={i + 1}
          index={i}
          onClick={this.handleHeaderClick}
          className="column"
        />
      );
    });
    topHeaderCells.unshift(<th key="blank" />);
    rows.unshift(<tr key="topHeader">{topHeaderCells}</tr>);
    return (
      <div>
        <table className={styles.plate}>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
  render() {
    const { activityName, activityDescription, plates } = this.props;
    if (activityName && plates) {
      return (
        <div className={styles.printout}>
          {plates.map((plate, i) => {
            const barcode = plate.barcode
              ? plate.barcode
              : 'No barcode assigned';
            return (
              <div key={plate.id} className={styles.container}>
                <div className={styles.header}>
                  <div>
                    <strong>{activityName}</strong>: {activityDescription}
                  </div>
                  <div>{`Plate ${i + 1}: ${barcode}`}</div>
                </div>
                <div className={styles.content}>
                  {this.renderTable(plate.wells)}
                </div>
              </div>
            );
          })}
        </div>
      );
    } else return null;
  }
}

Printout.propTypes = {
  activityName: PropTypes.string,
  activityDescription: PropTypes.string,
  plates: PropTypes.array.isRequired,
};
