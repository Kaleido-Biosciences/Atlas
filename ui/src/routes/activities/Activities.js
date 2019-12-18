import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';

import { REQUEST_PENDING, REQUEST_ERROR } from '../../constants';
import { fetchActivity } from '../../store/activitiesActions';
import { ActivityHeader } from '../../components/activity/ActivityHeader';
import { ExperimentDetails } from '../../components/activity/ActivityDetails';
import { Editor } from '../../components/experiment/Editor';
import styles from './Activity.module.css';

class Activities extends Component {
  componentDidMount() {
    const { activityId } = this.props.match.params;
    this.props.fetchActivity(activityId);
  }
  render() {
    const { activity, activityLoadingStatus, match } = this.props;
    return (
      <div className={styles.activity}>
        {activityLoadingStatus === REQUEST_PENDING && (
          <div className={styles.loader}>
            <Loader active inline="centered">
              Loading activity
            </Loader>
          </div>
        )}
        {activityLoadingStatus === REQUEST_ERROR && (
          <div>An error occurred while retrieving the activity</div>
        )}
        {activity && (
          <React.Fragment>
            <ActivityHeader />
            <Switch>
              <Route
                path={`${match.path}`}
                exact
                component={ExperimentDetails}
              />
              <Route path={`${match.path}/editor`} component={Editor} />
            </Switch>
          </React.Fragment>
        )}
      </div>
    );
  }
}

Activities.propTypes = {
  match: PropTypes.object.isRequired,
  fetchActivity: PropTypes.func.isRequired,
  activityLoadingStatus: PropTypes.string,
  activity: PropTypes.object,
};

const mapState = (state, props) => {
  const { activity, activityLoadingStatus } = state.activities;
  return { activity, activityLoadingStatus };
};

const mapDispatch = {
  fetchActivity,
};

const connected = connect(mapState, mapDispatch)(Activities);
export { connected as Activities };
