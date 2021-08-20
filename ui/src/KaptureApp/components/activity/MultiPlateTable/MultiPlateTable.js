import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class MultiPlateTable extends Component {
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
        Multi Plate Table View
        <table>
          <tbody>{this.renderGrids()}</tbody>
        </table>
      </div>
    );
  }
}

MultiPlateTable.propTypes = {
  view: PropTypes.object.isRequired,
};
