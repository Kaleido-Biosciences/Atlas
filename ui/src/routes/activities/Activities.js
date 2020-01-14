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
  selectActivityPublishStatus,
} from '../../store/selectors';
import {
  fetchActivity,
  publishActivityPlates,
} from '../../store/activitiesActions';
import { ActivityHeader } from '../../components/activity/ActivityHeader';
import { ActivityDetails } from '../../components/activity/ActivityDetails';
import { Editor } from '../../components/editor/Editor';
import { EditorActions } from '../../components/editor/EditorActions';
import { CompletedModal } from './CompletedModal';
import styles from './Activity.module.css';

class Activities extends Component {
  state = {
    modalOpen: false,
  };
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
  handleMarkAsCompleted = () => {
    this.setState({ modalOpen: true });
    if (this.props.onMarkAsCompleted) {
      this.props.onMarkAsCompleted();
    }
  };
  goToActivity = () => {
    const activity = this.props.activity;
    this.setState({ modalOpen: false });
    this.props.history.push(`/activities/${activity.id}`);
  };
  render() {
    const {
      activity,
      activityLoadingStatus,
      match,
      activityInitialized,
      activityContainerImportStatus,
      publishStatus,
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
        actions = (
          <EditorActions onMarkAsCompleted={this.handleMarkAsCompleted} />
        );
      }
      content = (
        <React.Fragment>
          <ActivityHeader actions={actions} />
          <Switch>
            <Route path={`${match.path}`} exact component={ActivityDetails} />
            <Route path={`${match.path}/editor`} component={Editor} />
          </Switch>
          <CompletedModal
            open={this.state.modalOpen}
            publishStatus={publishStatus}
            onBackToActivity={this.goToActivity}
          />
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
  publishStatus: PropTypes.string,
  fetchActivity: PropTypes.func.isRequired,
  onMarkAsCompleted: PropTypes.func,
};

const mapState = (state, props) => {
  return {
    activity: selectActivity(state),
    activityInitialized: selectActivityInitialized(state),
    activityLoadingStatus: selectActivityLoadingStatus(state),
    activityContainerImportStatus: selectActivityContainerImportStatus(state),
    publishStatus: selectActivityPublishStatus(state),
  };
};

const mapDispatch = {
  fetchActivity,
  onMarkAsCompleted: publishActivityPlates,
};

const connected = connect(mapState, mapDispatch)(Activities);
export { connected as Activities };
