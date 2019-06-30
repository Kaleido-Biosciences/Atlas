import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Icon } from 'semantic-ui-react';
import classNames from 'classnames';

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
  };

  handleExperimentSelect = experiment => {
    this.setState({ experiment });
  };

  handlePlateSizeChange = dimensions => {
    this.setState({ plateSize: dimensions });
  };

  render() {
    const { experiment, plateSize } = this.state;
    const experimentComplete = experiment;
    const plateSizeComplete = plateSize && plateSize.rows && plateSize.columns;
    const experimentStepClass = classNames(styles.headerStep, {
      [styles.completed]: experimentComplete,
    });
    const plateSizeStepClass = classNames(styles.headerStep, {
      [styles.completed]: plateSizeComplete,
    });
    return (
      <div className={styles.container}>
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
      </div>
    );
  }
}

SelectStep.propTypes = {};

const mapState = (state, props) => {
  return state;
};

const mapDispatch = {};

const connected = connect(
  mapState,
  mapDispatch
)(SelectStep);

export { connected as SelectStep };
