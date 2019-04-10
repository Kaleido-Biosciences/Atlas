import React, {Component } from 'react';
import { connect } from 'react-redux';

class NewExperimentPage extends Component {
  render() {
    console.log(this.props);
    return <div>New Experiment</div>
  }
};

const mapState = (state, props) => {
  return state.entityLists;
}

const connected = connect(mapState)(NewExperimentPage);
export { connected as NewExperimentPage };