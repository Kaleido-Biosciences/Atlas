import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class PlateTable extends Component {
  renderPlate() {
    const plate = this.props.view.data.grids[0];
    return plate.data.map((well, i) => {
      return (
        <tr key={well.name} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {well.name}
          </td>
          <td></td>
        </tr>
      );
    });
  }
  render() {
    return (
      <div className="h-full overflow-auto">
        <table className="h-full min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Well
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Components
              </th>
            </tr>
          </thead>
          <tbody>{this.renderPlate()}</tbody>
        </table>
      </div>
    );
  }
}

PlateTable.propTypes = {
  view: PropTypes.object.isRequired,
};
