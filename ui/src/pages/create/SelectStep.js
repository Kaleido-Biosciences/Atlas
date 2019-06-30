import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Icon } from 'semantic-ui-react';
import classNames from 'classnames';

import { ExperimentSearch } from '../../components/ExperimentSearch';
import { ExperimentCard } from '../../components/ExperimentCard';
import { PlateSizeForm } from '../../components/PlateSizeForm';
import './SelectStep.css';

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
    const experimentStepClass = classNames({
      'select-step-header-step': true,
      completed: experimentComplete,
    });
    const plateSizeStepClass = classNames({
      'select-step-header-step': true,
      completed: plateSizeComplete,
    });
    return (
      <div className="select-step-container">
        <div className="select-step-centered">
          <div className="select-step-experiment">
            <div className="select-step-header-container">
              <div className={experimentStepClass}>
                {experimentComplete ? <Icon name="check" /> : '1'}
              </div>
              <Header as="h3">Select an Experiment</Header>
            </div>
            <ExperimentSearch onSelect={this.handleExperimentSelect} />
            {experiment && <ExperimentCard experiment={experiment} />}
          </div>
          <div className="select-step-plate-size-container">
            <div className="select-step-plate-size">
              <div className="select-step-header-container">
                <div className={plateSizeStepClass}>
                  {plateSizeComplete ? <Icon name="check" /> : '2'}
                </div>
                <Header as="h3">Select Plate Size</Header>
              </div>
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
