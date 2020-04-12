import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PrintPosition } from './PrintPosition';
import { PrintHeader } from './PrintHeader';
import styles from './Printout.module.css';

export class Printout extends Component {
  renderTable(grid) {
    const gridData = grid.data;
    const { gridTypes, rowHeaders } = this.props;
    let displayType = false;
    if (gridTypes[grid.containerType]) {
      displayType =
        gridTypes[grid.containerType].displayContainerTypesInPrintout;
    }
    const rows = gridData.map((row, i) => {
      const columns = row.map((position, j) => {
        return (
          <td key={j + 1}>
            {
              <PrintPosition
                position={position}
                displayContainerType={displayType}
              />
            }
          </td>
        );
      });
      columns.unshift(
        <PrintHeader
          headerType="row"
          label={rowHeaders[i]}
          key={0}
          index={i}
          className="row"
        />
      );
      return <tr key={i + 1}>{columns}</tr>;
    });

    const topHeaderCells = gridData[0].map((position, i) => {
      return (
        <PrintHeader
          headerType="column"
          label={i + 1}
          key={i + 1}
          index={i}
          className="column"
        />
      );
    });

    topHeaderCells.unshift(<th key="blank" />);
    rows.unshift(<tr key="topHeader">{topHeaderCells}</tr>);

    return (
      <div>
        <table className={styles.grid}>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
  render() {
    const { activityName, activityDescription, grids } = this.props;
    if (activityName && grids) {
      return (
        <div className={styles.printout}>
          {grids.map((grid, i) => {
            const barcode = grid.barcode ? grid.barcode : 'No barcode assigned';
            return (
              <div key={grid.id} className={styles.container}>
                <div className={styles.header}>
                  <div>
                    <strong>{activityName}</strong>: {activityDescription}
                  </div>
                  <div>{`${grid.displayName}: ${barcode}`}</div>
                </div>
                <div className={styles.content}>{this.renderTable(grid)}</div>
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
  grids: PropTypes.array.isRequired,
  gridTypes: PropTypes.object,
  rowHeaders: PropTypes.array.isRequired,
};
