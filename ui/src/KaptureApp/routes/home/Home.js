import React, { Component } from 'react';

import { ActivitySearch } from 'KaptureApp/components';
import styles from './Home.module.css';

export class Home extends Component {
  handleSelect = ({ id }) => {
    this.props.history.push(`/activities/${id}`);
  };
  render() {
    return (
      <div className={styles.home}>
        <h1 className={styles.title}>Atlas</h1>
        <ActivitySearch autoFocus onSelect={this.handleSelect} />
      </div>
    );
  }
}
