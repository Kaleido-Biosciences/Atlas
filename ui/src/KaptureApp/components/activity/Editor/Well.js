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
    const { wells, selected } = this.props;
    const wellContainerStyle = {
      height: this.props.height + 'px',
      width: this.props.width + 'px',
      padding: this.props.outerPadding + 'px',
    };
    const wellStyle = {
      borderWidth: this.props.innerPadding + 'px',
    };
    const wellClass = classNames(styles.well, { selected });
    return (
      <div className={styles.wellContainer} style={wellContainerStyle}>
        <div className={wellClass} style={wellStyle}></div>
      </div>
    );
  }
}

Well.propTypes = {
  selected: PropTypes.bool,
  enableRemoveComponent: PropTypes.bool,
  height: PropTypes.number,
  innerPadding: PropTypes.number,
  onContainerClick: PropTypes.func,
  onRemoveComponent: PropTypes.func,
  outerPadding: PropTypes.number,
  well: PropTypes.object,
  width: PropTypes.number,
};

Well.defaultProps = {
  height: 120,
  width: 120,
  innerPadding: 4,
  outerPadding: 2,
};
