import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchEntityLists } from '../store/entityLists';

class NewExperimentPage extends Component {
  componentDidMount() {
    this.props.fetchEntityLists();
  }
  render() {
    return <div>New Experiment</div>;
  }
}

const mapState = (state, props) => {
  return state.entityLists;
};

const connected = connect(
  mapState,
  { fetchEntityLists }
)(NewExperimentPage);
export { connected as NewExperimentPage };
