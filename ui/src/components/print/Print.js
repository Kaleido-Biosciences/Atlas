import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';

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
      plates,
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
    } else if (!loading && !initialized && error) {
      content = <div>{error}</div>;
    } else if (!initialized) {
      content = null;
    } else if (!loading && !error && initialized) {
      content = (
        <React.Fragment>
          <Printout
            activityName={activityName}
            activityDescription={activityDescription}
            plates={plates}
            ref={el => (this.componentRef = el)}
          />
        </React.Fragment>
      );
    }
    return <div>{content}</div>;
  }
}

Print.propTypes = {
  location: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  initialized: PropTypes.bool,
  error: PropTypes.string,
  activityName: PropTypes.string,
  activityDescription: PropTypes.string,
  plates: PropTypes.array,
  onMount: PropTypes.func,
  contentRef: PropTypes.func,
};
