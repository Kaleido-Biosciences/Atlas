import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExperimentDetails extends Component {
  render() {
    const { experiment } = this.props;
    return (
      <div>
        {experiment.name} {experiment.description}
      </div>
    );
  }
}

ExperimentDetails.propTypes = {
  experiment: PropTypes.object,
};

const mapState = (state, props) => {
  const { experiment } = state.experiment;
  return { experiment };
};

const mapDispatch = {};

const connected = connect(mapState, mapDispatch)(ExperimentDetails);
export { connected as ExperimentDetails };
