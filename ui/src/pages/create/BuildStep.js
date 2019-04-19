import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createNewPlatemap } from '../../store/createExperiment';

class BuildStep extends Component {
  componentDidMount() {
    this.props.createNewPlatemap(96);
  }
  render() {
    return <div>Build Step</div>;
  }
}

const mapState = (state, props) => {
  return state.createExperiment;
};

const connected = connect(
  mapState,
  { createNewPlatemap }
)(BuildStep);
export { connected as BuildStep };
