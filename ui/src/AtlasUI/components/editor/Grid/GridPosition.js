import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

import { Container } from '../Container';
import styles from './Grid.module.css';

export class GridPosition extends PureComponent {
  handleAddContainerClick = () => {
    if (this.props.onAddContainerClick) {
      this.props.onAddContainerClick({
        position: this.props.position,
      });
    }
  };
  handleContainerClick = () => {
    if (this.props.onContainerClick) {
      this.props.onContainerClick({
        position: this.props.position,
      });
    }
  };
  renderContainer() {
    const { container } = this.props.position;
    return (
      <Container container={container} onClick={this.handleContainerClick} />
    );
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
    const { position, height, width, innerPadding, outerPadding } = this.props;
    const positionContainerStyle = {
      height: height + 'px',
      width: width + 'px',
      padding: outerPadding + 'px',
    };
    const positionStyle = {
      borderWidth: innerPadding + 'px',
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
  innerPadding: PropTypes.number.isRequired,
  outerPadding: PropTypes.number.isRequired,
  onAddContainerClick: PropTypes.func,
  onContainerClick: PropTypes.func,
};
