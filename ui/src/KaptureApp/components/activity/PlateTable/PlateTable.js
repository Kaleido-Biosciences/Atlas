import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class PlateTable extends Component {
  renderGrids() {
    const { view } = this.props;
    return view.data.grids.map((grid) => {
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
        Plate Table View
        <table>
          <tbody>{this.renderGrids()}</tbody>
        </table>
      </div>
    );
  }
}

PlateTable.propTypes = {
  view: PropTypes.object.isRequired,
};
