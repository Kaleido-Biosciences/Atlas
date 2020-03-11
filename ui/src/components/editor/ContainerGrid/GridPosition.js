import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

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
    return <div />;
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
    const { position, settings } = this.props;
    const { size, padding } = settings.containerSize;
    const positionContainerStyle = {
      height: size + 'px',
      width: size + 'px',
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
  settings: PropTypes.object.isRequired,
  onAddContainerClick: PropTypes.func,
};
