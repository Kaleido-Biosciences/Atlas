import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './PlateGrid.module.css';
import classNames from 'classnames';

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
  // renderContainer() {
  //   const { position } = this.props;
  //   return (
  //     <Container
  //       container={position.container}
  //       enableRemoveComponent={this.props.enableRemoveComponent}
  //       onClick={this.handleContainerClick}
  //       onRemoveComponent={this.handleRemoveComponent}
  //       position={{
  //         row: position.row,
  //         column: position.column,
  //       }}
  //       selected={this.props.containerSelected}
  //     />
  //   );
  // }
  render() {
    const { selected } = this.props;
    const wellStyle = {
      height: `${this.props.height}px`,
      marginBottom: `${this.props.marginBottom}px`,
      marginRight: `${this.props.marginRight}px`,
      width: `${this.props.width}px`,
    };
    const wellClass = classNames(styles.well, { selected });
    return <div className={wellClass} style={wellStyle}></div>;
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
  well: PropTypes.object,
  width: PropTypes.number,
};

Well.defaultProps = {
  height: 120,
  marginBottom: 4,
  marginRight: 4,
  width: 120,
};
