import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './SelectStep.css';

class SelectStep extends Component {
  render() {
    return <div className="select-step-container">Select step</div>;
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
