import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WellComponent } from '../WellComponent';
import styles from './PlateTable.module.css';

export class Well extends Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.well);
    }
  };
  handleRemoveComponent = (componentId) => {
    if (this.props.onRemoveComponent) {
      this.props.onRemoveComponent(this.props.well.id, componentId);
    }
  };
  renderComponents() {
    const { well } = this.props;
    return well.components.map((component) => {
      return (
        <div className={styles.wellComponent} key={component.id}>
          <WellComponent
            component={component}
            enableRemove={this.props.enableRemoveComponent}
            key={component.id}
            onRemove={this.handleRemoveComponent}
            position={{
              row: well.row,
              column: well.column,
            }}
          />
        </div>
      );
    });
  }
  render() {
    const { darkBackground, well } = this.props;
    let bgClassName;
    if (well.selected) {
      bgClassName = darkBackground ? 'bg-blue-100' : 'bg-blue-50';
    } else {
      bgClassName = darkBackground ? 'bg-gray-50' : 'bg-white';
    }
    return (
      <tr key={well.id} className={bgClassName} onClick={this.handleClick}>
        <td className="w-4 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {well.id}
        </td>
        <td className="w-4 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {well.row}
        </td>
        <td className="w-4 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {well.column}
        </td>
        <td className="px-6 py-4 text-sm text-gray-900">
          <div className={styles.components}>{this.renderComponents()}</div>
        </td>
      </tr>
    );
  }
}

Well.propTypes = {
  darkBackground: PropTypes.bool,
  enableRemoveComponent: PropTypes.bool,
  onRemoveComponent: PropTypes.func,
  well: PropTypes.object.isRequired,
};
