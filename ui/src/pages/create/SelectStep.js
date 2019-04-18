import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchEntityLists } from '../../store/entityLists';
import { NewExperimentForm } from '../../components/NewExperimentForm';

class SelectStep extends Component {
  componentDidMount() {
    this.props.fetchEntityLists();
  }

  handleFormSubmit = formValues => {
    console.log(formValues);
  };

  render() {
    const { pending, loaded, error } = this.props;
    if (pending) {
      return <div>Loading...</div>;
    } else if (error) {
      return <div>{error}</div>;
    } else if (loaded) {
      const { experiments, compounds, communities, media } = this.props.values;
      return (
        <NewExperimentForm
          onSubmit={this.handleFormSubmit}
          experiments={experiments}
          compounds={compounds}
          communities={communities}
          media={media}
        />
      );
    } else return <div />;
  }
}

const mapState = (state, props) => {
  return state.entityLists;
};

const connected = connect(
  mapState,
  { fetchEntityLists }
)(SelectStep);
export { connected as SelectStep };
