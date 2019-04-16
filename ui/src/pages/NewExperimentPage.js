import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchEntityLists } from '../store/entityLists';
import { NewExperimentForm } from '../components/NewExperimentForm';

class NewExperimentPage extends Component {
  componentDidMount() {
    this.props.fetchEntityLists();
  }

  render() {
    const { pending, loaded, error } = this.props;
    if (pending) {
      return <div>Loading...</div>;
    } else if (error) {
      return <div>{error}</div>;
    } else if (loaded) {
      return <NewExperimentForm />;
    } else return <div />;
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
