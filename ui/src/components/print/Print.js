import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactToPrint from 'react-to-print';
import { Loader, Button, Icon } from 'semantic-ui-react';

import { Printout } from './Printout';
import styles from './Print.module.css';

export class Print extends Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount(this.props.location.search);
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
          <ReactToPrint
            trigger={() => (
              <Button className={styles.printButton}>
                <Icon name="print" />
                Print
              </Button>
            )}
            content={() => this.componentRef}
          />
          <Printout
            activityName={activityName}
            activityDescription={activityDescription}
            plates={plates}
            ref={el => (this.componentRef = el)}
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
  initialized: PropTypes.bool,
  error: PropTypes.string,
  activityName: PropTypes.string,
  activityDescription: PropTypes.string,
  plates: PropTypes.array,
  onMount: PropTypes.func,
};
