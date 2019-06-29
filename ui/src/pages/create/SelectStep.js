import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';

import { ExperimentSearch } from '../../components/ExperimentSearch';
import { ExperimentCard } from '../../components/ExperimentCard';
import { PlateSizeForm } from '../../components/PlateSizeForm';
import './SelectStep.css';

class SelectStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experiment: null,
      plateSize: null,
    };
  }

  handleExperimentSelect = experiment => {
    this.setState({ experiment });
  };

  handlePlateSizeSelect = dimensions => {
    this.setState({ plateSize: dimensions });
  };

  render() {
    const { experiment } = this.state;
    return (
      <div className="select-step-container">
        <div className="select-step-centered">
          <Header as="h3">Select an Experiment</Header>
          <ExperimentSearch onSelect={this.handleExperimentSelect} />
          {experiment && <ExperimentCard experiment={experiment} />}
          <Header as="h3">Select Plate Size</Header>
          <PlateSizeForm onChange={this.handlePlateSizeSelect} />
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
