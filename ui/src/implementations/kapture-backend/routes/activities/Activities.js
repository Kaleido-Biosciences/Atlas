import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader, Message } from 'semantic-ui-react';
import { Route, Switch, matchPath } from 'react-router-dom';

import { ActivityHeader } from '../../../../components/activity/ActivityHeader';
import { ActivityDetails } from '../../../../components/activity/ActivityDetails';
import { Editor } from '../../../../components/editor/Editor';
import { EditorActions } from '../../../../components/editor/EditorActions';
import { Print } from '../../../../components/print';
import { PrintActions } from '../../../../components/print/PrintActions';
import { CompletedModal } from './CompletedModal';
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
    const { loading, error, containerCollectionsStale } = this.props;
    if (
      !loading &&
      !error &&
      containerCollectionsStale &&
      this.matchDetailsPath()
    ) {
      this.fetchActivity();
    }
  }
  componentWillUnmount() {
    if (this.props.onUnmount) {
      this.props.onUnmount();
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
      initialized,
      error,
      loading,
      match,
      publishStatus,
      containerCollectionsStale,
      editorInitialized,
      printInitialized,
    } = this.props;
    let content,
      actions = null;
    if (loading) {
      content = (
        <div className={styles.loader}>
          <Loader active inline="centered">
            Loading activity
          </Loader>
        </div>
      );
    } else if (error) {
      content = (
        <Message
          negative
          className={styles.errorMessage}
          icon="warning circle"
          header="An error occurred while loading the activity:"
          content={error}
        />
      );
    } else if (initialized) {
      if (this.matchEditorPath() && editorInitialized) {
        actions = (
          <EditorActions onMarkAsCompleted={this.handleMarkAsCompleted} />
        );
      } else if (this.matchPrintPath() && printInitialized) {
        actions = <PrintActions contentRef={this.state.contentRef} />;
      }
      content = (
        <React.Fragment>
          <ActivityHeader actions={actions} />
          <Switch>
            <Route
              path={`${match.path}`}
              exact
              render={routeProps => {
                return containerCollectionsStale ? null : (
                  <ActivityDetails {...routeProps} />
                );
              }}
            />
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
  initialized: PropTypes.bool,
  error: PropTypes.string,
  loading: PropTypes.bool,
  activity: PropTypes.object,
  publishStatus: PropTypes.string,
  publishedContainerCollectionDetails: PropTypes.object,
  containerCollectionsStale: PropTypes.bool,
  editorInitialized: PropTypes.bool,
  printInitialized: PropTypes.bool,
  fetchActivity: PropTypes.func.isRequired,
  onMarkAsCompleted: PropTypes.func,
  onUnmount: PropTypes.func,
};
