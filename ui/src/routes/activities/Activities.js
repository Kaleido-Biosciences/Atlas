import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader, Message } from 'semantic-ui-react';
import { Route, Switch, matchPath } from 'react-router-dom';

import {
  REQUEST_PENDING,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
} from '../../constants';
import { ActivityHeader } from '../../components/activity/ActivityHeader';
import { ActivityDetails } from '../../components/activity/ActivityDetails';
import { Editor } from '../../components/editor/Editor';
import { EditorActions } from '../../components/editor/EditorActions';
import { CompletedModal } from './CompletedModal';
import { Print } from '../../components/print';
import { PrintActions } from '../../components/print/PrintActions';
import styles from './Activity.module.css';

export class Activities extends Component {
  state = {
    modalOpen: false,
    contentRef: null,
  };
  constructor(props) {
    super(props);
    this.fetchActivity();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      !this.props.activityInitialized &&
      this.props.activityLoadingStatus !== REQUEST_PENDING &&
      this.props.activityLoadingStatus !== REQUEST_ERROR &&
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
  matchPrintPath() {
    const path = this.props.match.path + '/print';
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
  goToPrint = () => {
    const { publishedContainerCollectionDetails, activity } = this.props;
    const { status, version } = publishedContainerCollectionDetails;
    const url = `/activities/${activity.id}/print?status=${status}&version=${version}`;
    this.setState({ modalOpen: false });
    this.props.history.push(url);
  };
  render() {
    const {
      activity,
      activityLoadingStatus,
      activityLoadingError,
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
    } else if (
      !activityInitialized &&
      activityLoadingStatus === REQUEST_ERROR
    ) {
      content = (
        <Message
          negative
          className={styles.errorMessage}
          icon="warning circle"
          header="An error occurred while loading the activity:"
          content={activityLoadingError}
        />
      );
    } else if (!activityInitialized && this.matchDetailsPath()) {
      content = null;
    } else if (activity) {
      if (
        this.matchEditorPath() &&
        activityContainerImportStatus === REQUEST_SUCCESS
      ) {
        actions = (
          <EditorActions onMarkAsCompleted={this.handleMarkAsCompleted} />
        );
      } else if (
        this.matchPrintPath() &&
        activityContainerImportStatus === REQUEST_SUCCESS
      ) {
        actions = <PrintActions contentRef={this.state.contentRef} />;
      }
      content = (
        <React.Fragment>
          <ActivityHeader actions={actions} />
          <Switch>
            <Route path={`${match.path}`} exact component={ActivityDetails} />
            <Route path={`${match.path}/editor`} component={Editor} />
            <Route
              path={`${match.path}/print`}
              render={routeProps => (
                <Print
                  contentRef={contentRef => {
                    this.setState({ contentRef });
                  }}
                  {...routeProps}
                />
              )}
            />
          </Switch>
          <CompletedModal
            open={this.state.modalOpen}
            publishStatus={publishStatus}
            onBackToActivityClick={this.goToActivity}
            onPrintClick={this.goToPrint}
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
  activityLoadingError: PropTypes.string,
  activityContainerImportStatus: PropTypes.string,
  publishStatus: PropTypes.string,
  publishedContainerCollectionDetails: PropTypes.object,
  fetchActivity: PropTypes.func.isRequired,
  onMarkAsCompleted: PropTypes.func,
};
