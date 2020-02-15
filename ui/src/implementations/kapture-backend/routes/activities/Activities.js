import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader, Message } from 'semantic-ui-react';
import { Route, Switch, matchPath } from 'react-router-dom';

import { ActivityHeader } from '../../components';
import { ActivityDetails } from '../../components';
import { Editor } from '../../components';
import { PlateTabBar } from '../../components';
import { Plate } from '../../components';
import { ComponentList } from '../../components';
import { Tools } from '../../components';
import { EditorActions } from '../../components';
import { Print } from '../../components';
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
  goToActivity = () => {
    const { activityId } = this.props;
    this.setState({ modalOpen: false });
    this.props.history.push(`/activities/${activityId}`);
  };
  goToPrint = () => {
    const { publishedContainerCollectionDetails, activityId } = this.props;
    const { status, version } = publishedContainerCollectionDetails;
    const url = `/activities/${activityId}/print?status=${status}&version=${version}`;
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
      const tabBarComponent = <PlateTabBar />;
      const plateComponent = <Plate />;
      const componentListComponent = <ComponentList />;
      const toolsComponent = <Tools />;
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
            <Route
              path={`${match.path}/editor`}
              render={routeProps => {
                return (
                  <Editor
                    tabBarComponent={tabBarComponent}
                    plateComponent={plateComponent}
                    componentListComponent={componentListComponent}
                    toolsComponent={toolsComponent}
                    {...routeProps}
                  />
                );
              }}
            />
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
  activityId: PropTypes.number,
  publishStatus: PropTypes.string,
  publishedContainerCollectionDetails: PropTypes.object,
  containerCollectionsStale: PropTypes.bool,
  editorInitialized: PropTypes.bool,
  printInitialized: PropTypes.bool,
  loadActivity: PropTypes.func.isRequired,
  onMarkAsCompleted: PropTypes.func,
  onUnmount: PropTypes.func,
};
