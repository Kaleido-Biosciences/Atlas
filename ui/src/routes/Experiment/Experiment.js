import React, { Component } from 'react';

import { kapture } from '../../api';

export class Experiment extends Component {
  componentDidMount() {
    const { experimentId } = this.props.match.params;
    this.fetchExperiment(experimentId);
  }
  fetchExperiment = async experimentId => {
    const experiment = await kapture.fetchExperiment(experimentId);
    console.log('experiment', experiment);
  };
  render() {
    return <div>Experiment route</div>;
  }
}
