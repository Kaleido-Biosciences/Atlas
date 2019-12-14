import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ActivitySearch } from '../../components/activity/ActivitySearch';
import { setCurrentActivity } from '../../store/activitiesActions';
import styles from './Home.module.css';

class Home extends Component {
  handleSelect = ({ activity }) => {
    if (this.props.onSelect) {
      this.props.onSelect({ activity });
    }
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

const mapState = (state, props) => {
  return {};
};

const mapDispatch = {
  onSelect: setCurrentActivity,
};

const connected = connect(mapState, mapDispatch)(Home);
export { connected as Home };
