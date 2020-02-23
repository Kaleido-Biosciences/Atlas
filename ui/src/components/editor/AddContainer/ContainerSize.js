import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './ContainerSize.module.css';

export class ContainerSize extends Component {
  render() {
    const { dimensions, units } = this.props;
    const { rows, columns } = dimensions;
    const containers = rows && columns ? rows * columns : null;
    return (
      <div className={styles.container}>
        <table cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <td />
              <td>
                <div className={styles.columns}>
                  <div className={styles.columnsText}>
                    {columns ? `${columns} columns` : ''}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className={styles.rows}>
                  <div className={styles.rowText}>
                    {rows ? `${rows} rows` : ''}
                  </div>
                </div>
              </td>
              <td>
                <div className={styles.rectangle}>
                  <div className={styles.containerCount}>
                    {containers ? `${containers} ${units}` : ''}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

ContainerSize.propTypes = {
  dimensions: PropTypes.object,
  units: PropTypes.string,
};
