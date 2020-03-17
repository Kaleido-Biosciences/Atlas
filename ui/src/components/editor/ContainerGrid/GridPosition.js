import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

import { Container } from '../Container';
import styles from './ContainerGrid.module.css';

export class GridPosition extends Component {
  handleAddContainerClick = () => {
    if (this.props.onAddContainerClick) {
      this.props.onAddContainerClick({
        position: this.props.position,
      });
    }
  };
  renderContainer() {
    const { container } = this.props.position;
    return <Container container={container} />;
  }
  renderAddContainer() {
    return (
      <div
        className={styles.addContainer}
        title="Add Container"
        onClick={this.handleAddContainerClick}
      >
        <Icon name="add circle" size="huge" />
      </div>
    );
  }
  render() {
    const { position, height, width, padding } = this.props;
    const positionContainerStyle = {
      height: height + 'px',
      width: width + 'px',
      padding: padding + 'px',
    };
    const positionStyle = {
      borderWidth: padding + 'px',
    };
    return (
      <div
        className={styles.gridPositionContainer}
        style={positionContainerStyle}
      >
        <div className={styles.gridPosition} style={positionStyle}>
          {position.container
            ? this.renderContainer()
            : this.renderAddContainer()}
        </div>
      </div>
    );
  }
}

GridPosition.propTypes = {
  position: PropTypes.object,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  padding: PropTypes.number.isRequired,
  onAddContainerClick: PropTypes.func,
};
