import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchExperiment } from '../../store/experimentActions';

class Experiment extends Component {
  componentDidMount() {
    const { experimentId } = this.props.match.params;
    if (this.props.onMount) {
      this.props.onMount(experimentId);
    }
  }
  render() {
    return <div>Experiment route</div>;
  }
}

Experiment.propTypes = {
  match: PropTypes.object.isRequired,
  onMount: PropTypes.func,
};

const mapState = (state, props) => {
  return {};
};

const mapDispatch = {
  onMount: fetchExperiment,
};

const connected = connect(mapState, mapDispatch)(Experiment);
export { connected as Experiment };
