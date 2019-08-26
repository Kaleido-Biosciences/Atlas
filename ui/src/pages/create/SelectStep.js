import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Icon, Button, Message, Loader } from 'semantic-ui-react';
import classNames from 'classnames';

import {
  setExperimentOptions,
  initializePlates,
} from '../../store/experimentActions';
import { importPlates } from '../../store/plateFunctions';
import { ExperimentSearch } from '../../components/ExperimentSearch/ExperimentSearch';
import { ExperimentCard } from '../../components/ExperimentSearch/ExperimentCard';
import { PlateSizeForm } from '../../components/PlateSizeForm/PlateSizeForm';
import styles from './SelectStep.module.css';
import { api } from '../../api';

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
    fetchingPlates: false,
    plates: this.props.plates || null,
  };

  handleExperimentSelect = async experiment => {
    this.setState({ fetchingPlates: true, plates: null });
    const savedData = await api.aws.fetchPlates(experiment.name, 'DRAFT');
    const plates = await importPlates(savedData);
    this.setState({ fetchingPlates: false });
    let plateSize =
      !plates || plates.length === 0
        ? this.state.plateSize
        : {
            rows: plates[0].wells.length,
            columns: plates[0].wells[0].length,
          };
    const isValid = this.validateSelections(experiment, plateSize);
    this.setState({ experiment, showValidationMessage: !isValid });
    if (plates) {
      this.setState({ plates, plateSize });
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
    const { experiment, plateSize, plates } = this.state;
    if (this.validateSelections(experiment, plateSize)) {
      this.props.setExperimentOptions({ experiment, plateSize, plates });
      this.props.initializePlates();
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
      fetchingPlates,
      plates,
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
              {fetchingPlates && (
                <div className={styles.loader}>
                  <Loader active inline="centered">
                    Loading
                  </Loader>
                </div>
              )}
              {experiment && (
                <ExperimentCard
                  experiment={experiment}
                  plates={plates}
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
                disabled={fetchingPlates}
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
  initializePlates: PropTypes.func,
  onComplete: PropTypes.func,
};

const mapState = (state, props) => {
  const { experiment, plateSize, plates } = state.designExperiment;
  return { experiment, plateSize, plates };
};

const mapDispatch = {
  setExperimentOptions,
  initializePlates,
};

const connected = connect(
  mapState,
  mapDispatch
)(SelectStep);

export { connected as SelectStep };
