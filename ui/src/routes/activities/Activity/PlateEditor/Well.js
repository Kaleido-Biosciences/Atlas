import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { WellComponent } from '../WellComponent';
import styles from './PlateGrid.module.css';

export class Well extends PureComponent {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.well.id);
    }
  };
  handleRemoveComponent = (componentId) => {
    if (this.props.onRemoveComponent) {
      this.props.onRemoveComponent(this.props.well.id, componentId);
    }
  };
  renderComponents() {
    return this.props.well.components.map((component) => {
      return (
        <WellComponent
          compact={this.props.componentSettings.compact}
          component={component}
          enableRemove={this.props.enableRemoveComponent}
          enableTooltip={this.props.enableTooltips}
          key={component.id}
          onRemove={this.handleRemoveComponent}
          position={{
            row: this.props.well.row,
            column: this.props.well.column,
          }}
        />
      );
    });
  }
  render() {
    const wellStyle = {
      height: `${this.props.height}px`,
      marginBottom: `${this.props.marginBottom}px`,
      marginRight: `${this.props.marginRight}px`,
      padding: `${this.props.padding}px`,
      width: `${this.props.width}px`,
    };
    const wellClass = classNames(styles.well, {
      selected: this.props.well.selected,
    });
    return (
      <div className={wellClass} style={wellStyle} onClick={this.handleClick}>
        {this.renderComponents()}
      </div>
    );
  }
}

Well.propTypes = {
  componentSettings: PropTypes.object,
  enableRemoveComponent: PropTypes.bool,
  enableTooltips: PropTypes.bool,
  height: PropTypes.number,
  marginBottom: PropTypes.number,
  marginRight: PropTypes.number,
  onClick: PropTypes.func,
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
