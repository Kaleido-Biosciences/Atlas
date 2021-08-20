import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class PlateTable extends Component {
  renderGrids() {
    return this.props.grids.map((grid) => {
      return (
        <tr key={grid.id}>
          <td>{grid.name}</td>
        </tr>
      );
    });
  }
  render() {
    return (
      <div>
        <table>
          <tbody>{this.renderGrids()}</tbody>
        </table>
      </div>
    );
  }
}

PlateTable.propTypes = {
  grids: PropTypes.array.isRequired,
};
