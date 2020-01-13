import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import { Route, Switch, matchPath } from 'react-router-dom';

import {
  REQUEST_PENDING,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
} from '../../constants';
import {
  selectActivity,
  selectActivityLoadingStatus,
  selectActivityInitialized,
  selectActivityContainerImportStatus,
} from '../../store/selectors';
import { fetchActivity } from '../../store/activitiesActions';
import { ActivityHeader } from '../../components/activity/ActivityHeader';
import { ActivityDetails } from '../../components/activity/ActivityDetails';
import { Editor } from '../../components/editor/Editor';
import { EditorActions } from '../../components/editor/EditorActions';
import styles from './Activity.module.css';

class Activities extends Component {
  constructor(props) {
    super(props);
    this.fetchActivity();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      !this.props.activityInitialized &&
      this.props.activityLoadingStatus !== REQUEST_PENDING &&
      this.matchDetailsPath()
    ) {
      this.fetchActivity();
    }
  }
  matchDetailsPath() {
    const { path } = this.props.match;
    const { pathname: url } = this.props.location;
    const match = matchPath(url, {
      path,
      exact: true,
      strict: false,
    });
    return match;
  }
  matchEditorPath() {
    const path = this.props.match.path + '/editor';
    const { pathname: url } = this.props.location;
    const match = matchPath(url, {
      path,
      exact: true,
      strict: false,
    });
    return match;
  }
  fetchActivity() {
    const { activityId } = this.props.match.params;
    this.props.fetchActivity(activityId);
  }
  render() {
    const {
      activity,
      activityLoadingStatus,
      match,
      activityInitialized,
      activityContainerImportStatus,
    } = this.props;
    let content,
      actions = null;
    if (activityLoadingStatus === REQUEST_PENDING) {
      content = (
        <div className={styles.loader}>
          <Loader active inline="centered">
            Loading activity
          </Loader>
        </div>
      );
    } else if (!activityInitialized && this.matchDetailsPath()) {
      content = null;
    } else if (activityLoadingStatus === REQUEST_ERROR) {
      content = <div>An error occurred while retrieving the activity</div>;
    } else if (activity) {
      if (
        this.matchEditorPath() &&
        activityContainerImportStatus === REQUEST_SUCCESS
      ) {
        actions = <EditorActions />;
      }
      content = (
        <React.Fragment>
          <ActivityHeader actions={actions} />
          <Switch>
            <Route path={`${match.path}`} exact component={ActivityDetails} />
            <Route path={`${match.path}/editor`} component={Editor} />
          </Switch>
        </React.Fragment>
      );
    }
    return <div className={styles.activity}>{content}</div>;
  }
}

Activities.propTypes = {
  match: PropTypes.object.isRequired,
  activity: PropTypes.object,
  activityInitialized: PropTypes.bool,
  activityLoadingStatus: PropTypes.string,
  activityContainerImportStatus: PropTypes.string,
  fetchActivity: PropTypes.func.isRequired,
};

const mapState = (state, props) => {
  return {
    activity: selectActivity(state),
    activityInitialized: selectActivityInitialized(state),
    activityLoadingStatus: selectActivityLoadingStatus(state),
    activityContainerImportStatus: selectActivityContainerImportStatus(state),
  };
};

const mapDispatch = {
  fetchActivity,
};

const connected = connect(mapState, mapDispatch)(Activities);
export { connected as Activities };
