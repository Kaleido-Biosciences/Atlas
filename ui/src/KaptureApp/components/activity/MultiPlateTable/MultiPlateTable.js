import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class MultiPlateTable extends Component {
  renderGrids() {
    const { view } = this.props;
    return view.data.grids.map((grid, i) => {
      return (
        <tr key={grid.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {grid.name}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {grid.dimensions.rows}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {grid.dimensions.columns}
          </td>
        </tr>
      );
    });
  }
  render() {
    return (
      <div className="h-full overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Rows
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Columns
              </th>
            </tr>
          </thead>
          <tbody>{this.renderGrids()}</tbody>
        </table>
      </div>
    );
  }
}

MultiPlateTable.propTypes = {
  view: PropTypes.object.isRequired,
};
