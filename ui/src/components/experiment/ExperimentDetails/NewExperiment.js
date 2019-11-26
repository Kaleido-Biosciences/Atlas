import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Button } from 'semantic-ui-react';

import { PlateSizeForm } from '../PlateSizeForm';
import styles from './ExperimentDetails.module.css';

export class NewExperiment extends Component {
  state = {
    submitDisabled: false,
  };
  handlePlateSizeChange = ({ plateSize }) => {
    if (plateSize === null) {
      this.setState({ submitDisabled: true });
    } else {
      this.setState({ submitDisabled: false });
    }
    if (this.props.onPlateSizeChange) {
      this.props.onPlateSizeChange({ plateSize });
    }
  };
  render() {
    const { defaultPlateSize } = this.props;
    return (
      <div className={styles.newExperiment}>
        <Header as="h3">Start Experiment</Header>
        Select a plate size to get started
        <div className={styles.plateSizeFormContainer}>
          <PlateSizeForm
            defaultDimensions={defaultPlateSize}
            onChange={this.handlePlateSizeChange}
          />
        </div>
        <Button disabled={this.state.submitDisabled} primary>
          Submit
        </Button>
      </div>
    );
  }
}

NewExperiment.propTypes = {
  defaultPlateSize: PropTypes.object,
  onPlateSizeChange: PropTypes.func,
};
