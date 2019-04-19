import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchEntityLists } from '../../store/entityLists';
import { createExperimentActions } from '../../store/createExperiment';
import { NewExperimentForm } from '../../components/NewExperimentForm';

class SelectStep extends Component {
  componentDidMount() {
    this.props.fetchEntityLists();
  }

  handleFormSubmit = formValues => {
    this.props.setExperimentOptions(formValues);
    this.props.onStepComplete();
  };

  render() {
    const { pending, loaded, error, currentValues } = this.props;
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
          initialValues={currentValues}
        />
      );
    } else return <div />;
  }
}

const mapState = (state, props) => {
  return {
    currentValues: {
      experiment: state.createExperiment.experiment,
      ...state.createExperiment.components,
    },
    ...state.entityLists,
  };
};

const connected = connect(
  mapState,
  { fetchEntityLists, ...createExperimentActions }
)(SelectStep);
export { connected as SelectStep };
