import React, { Component } from 'react';

import { ActivitySearch } from '../../components/activity/ActivitySearch';
import styles from './Home.module.css';

export class Home extends Component {
  handleSelect = ({ activity }) => {
    this.props.history.push(`/activities/${activity.id}`);
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
