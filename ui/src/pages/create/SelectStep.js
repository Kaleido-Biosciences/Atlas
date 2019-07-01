import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Icon, Button, Message } from 'semantic-ui-react';
import classNames from 'classnames';

import {
  createExperimentActions,
  initializePlateMaps,
} from '../../store/createExperiment';
import { ExperimentSearch } from '../../components/ExperimentSearch';
import { ExperimentCard } from '../../components/ExperimentCard';
import { PlateSizeForm } from '../../components/PlateSizeForm';
import styles from './SelectStep.module.css';

const renderHeader = options => {
  const { stepClass, complete, stepNumber, headerText } = options;
  return (
    <div className={styles.headerContainer}>
      <div className={stepClass}>
        {complete ? <Icon name="check" /> : stepNumber}
      </div>
      <Header as="h3">{headerText}</Header>
    </div>
  );
};

class SelectStep extends Component {
  state = {
    experiment: null,
    plateSize: null,
    submissionAttemped: false,
    showValidationMessage: false,
  };

  handleExperimentSelect = experiment => {
    const isValid = this.validateSelections(experiment, this.state.plateSize);
    this.setState({ experiment, showValidationMessage: !isValid });
  };

  handlePlateSizeChange = dimensions => {
    const isValid = this.validateSelections(this.state.experiment, dimensions);
    this.setState({ plateSize: dimensions, showValidationMessage: !isValid });
  };

  validateSelections = (experiment, dimensions) => {
    return experiment && dimensions && dimensions.rows && dimensions.columns;
  };

  handleButtonClick = () => {
    const { experiment, plateSize } = this.state;
    if (this.validateSelections(experiment, plateSize)) {
      this.props.setExperimentOptions({ experiment, plateSize });
      this.props.initializePlateMaps();
      if(this.props.onComplete) {
        this.props.onComplete();
      }
    } else {
      this.setState({ submissionAttempted: true, showValidationMessage: true });
    }
  };

  render() {
    const {
      experiment,
      plateSize,
      submissionAttempted,
      showValidationMessage,
    } = this.state;
    const experimentComplete = experiment;
    const plateSizeComplete = plateSize && plateSize.rows && plateSize.columns;
    const experimentStepClass = classNames(styles.headerStep, {
      [styles.completed]: experimentComplete,
    });
    const plateSizeStepClass = classNames(styles.headerStep, {
      [styles.completed]: plateSizeComplete,
    });
    return (
      <div>
        <div className={styles.columnsContainer}>
          <div className={styles.columns}>
            <div className={styles.experimentSearch}>
              {renderHeader({
                stepClass: experimentStepClass,
                complete: experimentComplete,
                stepNumber: '1',
                headerText: 'Select an Experiment',
              })}
              <ExperimentSearch onSelect={this.handleExperimentSelect} />
              {experiment && <ExperimentCard experiment={experiment} />}
            </div>
            <div className={styles.plateSizeFormContainer}>
              <div>
                {renderHeader({
                  stepClass: plateSizeStepClass,
                  complete: plateSizeComplete,
                  stepNumber: '2',
                  headerText: 'Select Plate Size',
                })}
                <PlateSizeForm onChange={this.handlePlateSizeChange} />
              </div>
            </div>
          </div>
          <div className={styles.submissionContainer}>
            {submissionAttempted && showValidationMessage ? (
              <div className={styles.messageContainer}>
                <Message negative>
                  Please select an experiment and a plate size.
                </Message>
              </div>
            ) : null}
            <div className={styles.buttonContainer}>
              <Button primary onClick={this.handleButtonClick}>
                Done
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SelectStep.propTypes = {
  onComplete: PropTypes.func,
};

const mapState = (state, props) => {
  return state;
};

const mapDispatch = {
  setExperimentOptions: createExperimentActions.setExperimentOptions,
  initializePlateMaps,
};

const connected = connect(
  mapState,
  mapDispatch
)(SelectStep);

export { connected as SelectStep };
