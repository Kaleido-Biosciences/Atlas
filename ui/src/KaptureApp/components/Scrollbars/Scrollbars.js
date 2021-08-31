import React, { Component } from 'react';
import { Scrollbars as Scroll } from 'react-custom-scrollbars';
import styles from './Scrollbars.module.css';

export class Scrollbars extends Component {
  renderTrackHorizontal({ style, ...props }) {
    return (
      <div
        className={styles.horizontalTrack}
        style={{ ...style, height: '10px' }}
        {...props}
      />
    );
  }
  renderTrackVertical({ style, ...props }) {
    return (
      <div
        className={styles.verticalTrack}
        style={{ ...style, width: '10px' }}
        {...props}
      />
    );
  }
  render() {
    return (
      <Scroll
        renderTrackHorizontal={this.renderTrackHorizontal}
        renderTrackVertical={this.renderTrackVertical}
        style={{ height: '100%', width: '100%' }}
      >
        {this.props.children}
      </Scroll>
    );
  }
}
