import React, { Component } from 'react';
import styles from './Spinner.module.css';

export class Spinner extends Component {
  render() {
    return (
      <div className={`${styles.spinner}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}
