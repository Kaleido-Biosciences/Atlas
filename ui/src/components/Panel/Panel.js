import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';

import styles from './Panel.module.css';

export class Panel extends Component {
  render() {
    return (
      <Draggable handle={`.${styles.dragHandle}`} position={null} scale={1}>
        <div className={this.props.containerClass}>
          <Resizable
            enable={{
              bottom: true,
              bottomLeft: false,
              bottomRight: true,
              left: false,
              right: true,
              top: false,
              topLeft: false,
              topRight: false,
            }}
            handleStyles={{
              right: { cursor: 'e-resize' },
              bottom: { cursor: 's-resize' },
            }}
          >
            <Segment className={styles.resizeContainer}>
              <div className={styles.dragHandle} />
              {this.props.children}
            </Segment>
          </Resizable>
        </div>
      </Draggable>
    );
  }
}

Panel.propTypes = {
  containerClass: PropTypes.string.isRequired,
};
