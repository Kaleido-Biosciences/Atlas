import React, { Component } from 'react';
import styles from './Spinner.module.css';

export class Spinner extends Component {
  render() {
    return (
      <div className={`${styles.spinner} ${this.props.className}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}
