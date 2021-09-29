import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ContainerComponent } from 'AtlasUI/components';
import styles from './PlateGrid.module.css';

export class Well extends PureComponent {
  handleContainerClick = () => {
    if (this.props.onContainerClick) {
      this.props.onContainerClick({
        position: this.props.position,
      });
    }
  };
  handleRemoveComponent = (componentId) => {
    if (this.props.onRemoveComponent) {
      this.props.onRemoveComponent(this.props.position, componentId);
    }
  };
  renderComponents() {
    return this.props.well.components.map((component) => {
      return (
        <ContainerComponent
          component={component}
          enableRemove={this.props.enableRemoveComponent}
          key={component.id}
          onRemove={this.props.onRemoveComponent}
          position={{
            row: this.props.well.row,
            column: this.props.well.column,
          }}
        />
      );
    });
  }
  render() {
    const { selected } = this.props;
    const wellStyle = {
      height: `${this.props.height}px`,
      marginBottom: `${this.props.marginBottom}px`,
      marginRight: `${this.props.marginRight}px`,
      padding: `${this.props.padding}px`,
      width: `${this.props.width}px`,
    };
    const wellClass = classNames(styles.well, { selected });
    return (
      <div className={wellClass} style={wellStyle}>
        {this.renderComponents()}
      </div>
    );
  }
}

Well.propTypes = {
  selected: PropTypes.bool,
  enableRemoveComponent: PropTypes.bool,
  height: PropTypes.number,
  marginBottom: PropTypes.number,
  marginRight: PropTypes.number,
  onContainerClick: PropTypes.func,
  onRemoveComponent: PropTypes.func,
  padding: PropTypes.number,
  well: PropTypes.object,
  width: PropTypes.number,
};

Well.defaultProps = {
  height: 120,
  marginBottom: 4,
  marginRight: 4,
  padding: 4,
  width: 120,
};
