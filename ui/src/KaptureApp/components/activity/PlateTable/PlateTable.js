import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ContainerComponent } from 'AtlasUI/components';
import styles from './PlateTable.module.css';

export class PlateTable extends Component {
  renderComponents(position) {
    if (position.container) {
      return position.container.components.map((component) => {
        return (
          <div className={styles.containerComponent}>
            <ContainerComponent
              component={component}
              enableRemove={this.props.enableRemoveComponent}
              key={component.id}
              onRemove={this.props.onRemoveComponent}
              position={position}
            />
          </div>
        );
      });
    } else return null;
  }
  renderPlate() {
    const plate = this.props.view.data.grids[0];
    return plate.positions.map((position, i) => {
      return (
        <tr
          key={position.name}
          className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
        >
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {position.name}
          </td>
          <td className="px-6 py-4 text-sm text-gray-900">
            <div className={styles.components}>
              {this.renderComponents(position)}
            </div>
          </td>
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
