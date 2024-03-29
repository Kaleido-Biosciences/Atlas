import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'ui';
import { Activity } from './Activity';

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
      content = (
        <div className="w-full pt-10 flex items-center justify-center">
          <Spinner />
        </div>
      );
    } else if (this.props.initializationError) {
      content = <div>Error</div>;
    } else if (this.props.initialized) {
      content = <Activity />;
    }
    return <div className="h-full">{content}</div>;
  }
}

Activities.propTypes = {
  initialized: PropTypes.bool,
  initializationError: PropTypes.string,
  loading: PropTypes.bool,
  onMount: PropTypes.func,
  onUnmount: PropTypes.func,
};
