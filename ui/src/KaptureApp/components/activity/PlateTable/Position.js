import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ContainerComponent } from 'AtlasUI/components';
import styles from './PlateTable.module.css';

export class Position extends Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.position);
    }
  };
  renderComponents(position) {
    if (position.container) {
      return position.container.components.map((component) => {
        return (
          <div className={styles.containerComponent} key={component.id}>
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
  render() {
    const { position } = this.props;
    let rowBgClassName;
    if (this.props.selected) {
      rowBgClassName = 'bg-blue-100';
    } else
      rowBgClassName = this.props.index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
    return (
      <tr
        key={position.name}
        className={rowBgClassName}
        onClick={this.handleClick}
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
  }
}

Position.propTypes = {
  index: PropTypes.number,
  position: PropTypes.object.isRequired,
  selected: PropTypes.bool,
};
