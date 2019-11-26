import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Button } from 'semantic-ui-react';

import { PlateSizeForm } from '../PlateSizeForm';
import styles from './ExperimentDetails.module.css';

export class NewExperiment extends Component {
  render() {
    const { defaultPlateSize } = this.props;
    return (
      <div className={styles.newExperiment}>
        <Header as="h3">Start Experiment</Header>
        Select a plate size to get started
        <div className={styles.plateSizeFormContainer}>
          <PlateSizeForm defaultDimensions={defaultPlateSize} />
        </div>
        <Button primary>Done</Button>
      </div>
    );
  }
}

NewExperiment.propTypes = {
  defaultPlateSize: PropTypes.object,
};
