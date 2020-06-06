import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader, Message } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';

import { ActivityDetails } from 'FetchApp/components';
import styles from './Activities.module.css';

export class Activities extends Component {
  componentDidMount() {
    const { activityId } = this.props.match.params;
    if (this.props.onMount) {
      this.props.onMount(activityId);
    }
  }
  render() {
    const { initialized, loading, error, match } = this.props;
    let content;
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
      content = (
        <React.Fragment>
          <Switch>
            <Route path={`${match.path}`} exact component={ActivityDetails} />
            <Route
              path={`${match.path}/editor`}
              render={(routeProps) => {
                return <div>Editor</div>;
              }}
            />
            <Route
              path={`${match.path}/print`}
              render={(routeProps) => <div>Print</div>}
            />
          </Switch>
        </React.Fragment>
      );
    }
    return <div className={styles.activities}>{content}</div>;
  }
}

Activities.propTypes = {
  match: PropTypes.object.isRequired,
  onMount: PropTypes.func,
  initialized: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.string,
};
