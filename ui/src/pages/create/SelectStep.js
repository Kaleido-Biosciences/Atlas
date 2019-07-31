import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Icon, Button, Message, Loader } from 'semantic-ui-react';
import classNames from 'classnames';

import {
  setExperimentOptions,
  initializePlateMaps,
} from '../../store/experimentActions';
import { importPlateMaps } from '../../store/plateFunctions';
import { ExperimentSearch } from '../../components/ExperimentSearch';
import { ExperimentCard } from '../../components/ExperimentCard';
import { PlateSizeForm } from '../../components/PlateSizeForm';
import styles from './SelectStep.module.css';
import { fetchPlateMaps } from '../../api';

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
    experiment: this.props.experiment,
    plateSize: this.props.plateSize,
    submissionAttemped: false,
    showValidationMessage: false,
    fetchingPlateMaps: false,
    plateMaps: null,
  };

  handleExperimentSelect = async experiment => {
    this.setState({ fetchingPlateMaps: true, plateMaps: null });
    const savedData = await fetchPlateMaps(experiment.name, 'DRAFT');
    const plateMaps = await importPlateMaps(savedData);
    this.setState({ fetchingPlateMaps: false });
    let plateSize =
      !plateMaps || plateMaps.length === 0
        ? this.state.plateSize
        : {
            rows: plateMaps[0].data.length,
            columns: plateMaps[0].data[0].length,
          };
    const isValid = this.validateSelections(experiment, plateSize);
    this.setState({ experiment, showValidationMessage: !isValid });
    if (plateMaps) {
      this.setState({ plateMaps, plateSize });
    }
  };

  handlePlateSizeChange = dimensions => {
    const isValid = this.validateSelections(this.state.experiment, dimensions);
    this.setState({ plateSize: dimensions, showValidationMessage: !isValid });
  };

  validateSelections = (experiment, dimensions) => {
    return experiment && dimensions && dimensions.rows && dimensions.columns;
  };

  handleButtonClick = () => {
    const { experiment, plateSize, plateMaps } = this.state;
    if (this.validateSelections(experiment, plateSize)) {
      this.props.setExperimentOptions({ experiment, plateSize, plateMaps });
      this.props.initializePlateMaps();
      if (this.props.onComplete) {
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
      fetchingPlateMaps,
      plateMaps,
    } = this.state;
    const experimentComplete = experiment;
    const plateSizeComplete = plateSize && plateSize.rows && plateSize.columns;
    const experimentStepClass = classNames(styles.headerStep, {
      [styles.completed]: experimentComplete,
    });
    const plateSizeStepClass = classNames(styles.headerStep, {
      [styles.completed]: plateSizeComplete,
    });
    const experimentDefaultValue = experiment ? experiment.name : '';
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
              <ExperimentSearch
                defaultValue={experimentDefaultValue}
                onSelect={this.handleExperimentSelect}
              />
              {fetchingPlateMaps && (
                <div className={styles.loader}>
                  <Loader active inline="centered">
                    Loading
                  </Loader>
                </div>
              )}
              {experiment && (
                <ExperimentCard
                  experiment={experiment}
                  plateMaps={plateMaps}
                  plateSize={plateSize}
                />
              )}
            </div>
            <div className={styles.plateSizeFormContainer}>
              <div>
                {renderHeader({
                  stepClass: plateSizeStepClass,
                  complete: plateSizeComplete,
                  stepNumber: '2',
                  headerText: 'Select Plate Size',
                })}
                <PlateSizeForm
                  onChange={this.handlePlateSizeChange}
                  defaultDimensions={plateSize}
                />
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
              <Button
                primary
                disabled={fetchingPlateMaps}
                onClick={this.handleButtonClick}
              >
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
  experiment: PropTypes.object,
  plateSize: PropTypes.object,
  setExperimentOptions: PropTypes.func,
  initializePlateMaps: PropTypes.func,
  onComplete: PropTypes.func,
};

const mapState = (state, props) => {
  const { experiment, plateSize } = state.createExperiment;
  return { experiment, plateSize };
};

const mapDispatch = {
  setExperimentOptions,
  initializePlateMaps,
};

const connected = connect(
  mapState,
  mapDispatch
)(SelectStep);

export { connected as SelectStep };
