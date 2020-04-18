import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader, Message } from 'semantic-ui-react';
import { Route, Switch, matchPath } from 'react-router-dom';

import { PrintActions } from 'AtlasUI/components';
import {
  ActivityHeader,
  ActivityDetails,
  Editor,
  EditorSidebar,
  EditorActions,
  Print,
  GridTabs,
  ActiveGrid,
} from 'KaptureApp/components';
import { CompletedModal } from './CompletedModal';
import styles from './Activity.module.css';

export class Activities extends Component {
  state = {
    modalOpen: false,
    contentRef: null,
  };
  constructor(props) {
    super(props);
    this.loadActivity();
  }
  componentDidUpdate(prevProps, prevState) {
    const { loading, error, containerCollectionsStale } = this.props;
    if (
      !loading &&
      !error &&
      containerCollectionsStale &&
      this.matchDetailsPath()
    ) {
      this.loadActivity();
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
  loadActivity() {
    const { activityId } = this.props.match.params;
    this.props.loadActivity(activityId);
  }
  handleMarkAsCompleted = () => {
    this.setState({ modalOpen: true });
    if (this.props.onMarkAsCompleted) {
      this.props.onMarkAsCompleted();
    }
  };
  goToRoute = ({ route }) => {
    let url = this.props.match.url;
    url = url.endsWith('/') ? url.slice(0, -1) : url;
    this.props.history.push(url + route);
  };
  goToActivity = () => {
    const { activityId } = this.props;
    this.closeCompletedModal();
    this.props.history.push(`/activities/${activityId}`);
  };
  goToPrint = () => {
    const { publishedContainerCollectionDetails, activityId } = this.props;
    const { status, version } = publishedContainerCollectionDetails;
    const url = `/activities/${activityId}/print?status=${status}&version=${version}`;
    this.closeCompletedModal();
    this.props.history.push(url);
  };
  closeCompletedModal = () => {
    this.setState({ modalOpen: false });
    if (this.props.onCompletedModalClose) {
      this.props.onCompletedModalClose();
    }
  };
  render() {
    const {
      initialized,
      error,
      loading,
      match,
      publishPending,
      publishSuccess,
      publishError,
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
      const tabsComponent = <GridTabs />;
      const activeGridComponent = <ActiveGrid />;
      const sidebarComponent = <EditorSidebar />;
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
              render={(routeProps) => {
                return containerCollectionsStale ? null : (
                  <ActivityDetails
                    {...routeProps}
                    onCollectionClick={this.goToRoute}
                  />
                );
              }}
            />
            <Route
              path={`${match.path}/editor`}
              render={(routeProps) => {
                return (
                  <Editor
                    tabsComponent={tabsComponent}
                    activeGridComponent={activeGridComponent}
                    sidebarComponent={sidebarComponent}
                    {...routeProps}
                  />
                );
              }}
            />
            <Route
              path={`${match.path}/print`}
              render={(routeProps) => (
                <Print
                  contentRef={(contentRef) => {
                    this.setState({ contentRef });
                  }}
                  {...routeProps}
                />
              )}
            />
          </Switch>
          <CompletedModal
            open={this.state.modalOpen}
            pending={publishPending}
            success={publishSuccess}
            error={publishError}
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
  activityId: PropTypes.number,
  publishPending: PropTypes.bool,
  publishSuccess: PropTypes.bool,
  publishError: PropTypes.string,
  publishedContainerCollectionDetails: PropTypes.object,
  containerCollectionsStale: PropTypes.bool,
  editorInitialized: PropTypes.bool,
  printInitialized: PropTypes.bool,
  loadActivity: PropTypes.func.isRequired,
  onMarkAsCompleted: PropTypes.func,
  onUnmount: PropTypes.func,
  onCompletedModalClose: PropTypes.func,
};
