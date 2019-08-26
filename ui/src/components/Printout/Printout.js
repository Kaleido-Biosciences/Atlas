import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PLATEMAP_ROW_HEADERS } from '../../constants';
import { PrintoutWell } from './PrintoutWell';
import { PlateMapHeader } from '../PlateMap/PlateMapHeader';
import styles from './Printout.module.css';

export class Printout extends Component {
  renderTable(plateMap) {
    const rows = plateMap.map((row, i) => {
      const columns = row.map((well, j) => {
        return (
          <td key={j + 1}>
            <PrintoutWell well={well} />
          </td>
        );
      });
      columns.unshift(
        <PlateMapHeader
          headerType="row"
          label={PLATEMAP_ROW_HEADERS[i]}
          key={0}
          index={i}
          onClick={this.handleHeaderClick}
          className="row"
        />
      );
      return <tr key={i + 1}>{columns}</tr>;
    });

    const topHeaderCells = plateMap[0].map((well, i) => {
      return (
        <PlateMapHeader
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
      <div>
        <table className={styles.plateMap}>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
  render() {
    const { experiment, plateMaps } = this.props;
    if (experiment && plateMaps) {
      return (
        <div className={styles.printout}>
          {plateMaps.map((plateMap, i) => {
            return (
              <div key={plateMap.id} className={styles.container}>
                <div className={styles.header}>
                  <h4>{experiment.name}: </h4>
                  {experiment.description}
                </div>
                <div className={styles.content}>
                  <h5>{`Plate ${i + 1}`}</h5>
                  {this.renderTable(plateMap.data)}
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
  experiment: PropTypes.object,
  plateMaps: PropTypes.array.isRequired,
};
