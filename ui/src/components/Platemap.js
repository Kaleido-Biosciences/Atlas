import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { plateRowHeaders } from '../constants';

export class Platemap extends Component {
  renderTable(platemap) {
    const rows = platemap.map((row, i) => {
      const columns = row.map((well, j) => {
        return (
          <td key={j + 1}>
            <div className="well">well</div>
          </td>
        );
      });
      columns.unshift(<th key={0}>{plateRowHeaders[i]}</th>);
      return <tr key={i + 1}>{columns}</tr>;
    });

    const topHeaderCells = platemap[0].map((well, i) => {
      return <th key={i + 1}>{i + 1}</th>;
    });
    topHeaderCells.unshift(<td key="blank" />);
    rows.unshift(<tr key="topHeader">{topHeaderCells}</tr>);
    return (
      <div className="platemap-container">
        <table className="plate">
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
  render() {
    const { platemap } = this.props;
    return (
      <div style={{ border: '1px solid black' }}>
        <div>{platemap.id}</div>
        {this.renderTable(platemap.map)}
      </div>
    );
  }
}

Platemap.propTypes = {
  platemap: PropTypes.object.isRequired,
};
