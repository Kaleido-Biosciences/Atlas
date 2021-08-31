import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Activity } from 'KaptureApp/components';
import styles from './Activities.module.css';

export class Activities extends Component {
  componentDidMount() {
    const { activityId } = this.props.match.params;
    this.props.onMount(activityId);
  }
  componentWillUnmount() {
    if (this.props.onUnmount) {
      this.props.onUnmount();
    }
  }
  render() {
    let content;
    if (this.props.loading) {
      content = <div>Loading</div>;
    } else if (this.props.initializationError) {
      content = <div>Error</div>;
    } else if (this.props.initialized) {
      content = <Activity />;
    }
    return <div className={styles.activities}>{content}</div>;
  }
}

Activities.propTypes = {
  initialized: PropTypes.bool,
  initializationError: PropTypes.string,
  loading: PropTypes.bool,
  onMount: PropTypes.func,
  onUnmount: PropTypes.func,
};
