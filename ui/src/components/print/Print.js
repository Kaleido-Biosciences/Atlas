import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader, Message } from 'semantic-ui-react';

import { Printout } from './Printout';
import styles from './Print.module.css';

export class Print extends Component {
  componentRef = null;
  contentRefUpdated = false;
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount(this.props.location.search);
    }
  }
  componentWillUnmount() {
    if (this.props.onUnmount) {
      this.props.onUnmount();
    }
  }
  componentDidUpdate() {
    if (
      this.props.contentRef &&
      this.props.initialized &&
      this.componentRef &&
      !this.contentRefUpdated
    ) {
      this.contentRefUpdated = true;
      this.props.contentRef(this.componentRef);
    }
  }
  render() {
    const {
      loading,
      error,
      initialized,
      activityName,
      activityDescription,
      grids,
      gridTypes,
    } = this.props;
    let content;
    if (loading) {
      content = (
        <div className={styles.loader}>
          <Loader active inline="centered">
            Importing containers
          </Loader>
        </div>
      );
    } else if (error) {
      content = (
        <Message
          negative
          className={styles.errorMessage}
          icon="warning circle"
          header="An error occurred while importing containers:"
          content={error}
        />
      );
    } else if (initialized) {
      content = (
        <React.Fragment>
          <Printout
            activityName={activityName}
            activityDescription={activityDescription}
            grids={grids}
            gridTypes={gridTypes}
            ref={(el) => (this.componentRef = el)}
          />
        </React.Fragment>
      );
    }
    return <div className={styles.print}>{content}</div>;
  }
}

Print.propTypes = {
  location: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  initialized: PropTypes.bool,
  grids: PropTypes.array,
  gridTypes: PropTypes.object,
  activityName: PropTypes.string,
  activityDescription: PropTypes.string,
  onMount: PropTypes.func,
  onUnmount: PropTypes.func,
  contentRef: PropTypes.func,
};
