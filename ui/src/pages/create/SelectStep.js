import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';

import { fetchEntityLists } from '../../store/entityLists';
import {
  createExperimentActions,
  initializePlateMaps,
} from '../../store/createExperiment';
import { NewExperimentForm } from '../../components/NewExperimentForm';

class SelectStep extends Component {
  componentDidMount() {
    if (!this.props.loaded && !this.props.pending) {
      this.props.fetchEntityLists();
    }
  }

  handleFormSubmit = formValues => {
    const {
      experiment,
      plateSize,
      communities: formCommunities,
      compounds: formCompounds,
      media: formMedia,
      supplements: formSupplements,
    } = formValues;
    const { communities, compounds, media, supplements } = this.props.lists;
    const findById = (id, list) => list.find(entity => entity.id === id);
    const selectedCommunities = formCommunities.map(id => {
      return findById(id, communities);
    });
    const selectedCompounds = formCompounds.map(id => {
      return findById(id, compounds);
    });
    const selectedMedia = formMedia.map(id => {
      return findById(id, media);
    });
    const selectedSupplements = formSupplements.map(id => {
      return findById(id, supplements);
    });
    const experimentOptions = {
      experiment,
      plateSize,
      selectedCommunities,
      selectedCompounds,
      selectedMedia,
      selectedSupplements,
    };
    this.props.setExperimentOptions(experimentOptions);
    this.props.initializePlateMaps();
    this.props.onStepComplete();
  };

  render() {
    const { pending, loaded, error, currentValues } = this.props;
    if (pending) {
      return (
        <div className="select-loading">
          <Loader size="massive" active>
            Loading
          </Loader>
        </div>
      );
    } else if (error) {
      return <div>{error}</div>;
    } else if (loaded) {
      const {
        experiments,
        compounds,
        communities,
        media,
        supplements,
      } = this.props.selectOptions;
      return (
        <div className="select-container">
          <NewExperimentForm
            onSubmit={this.handleFormSubmit}
            experimentOptions={experiments}
            compoundOptions={compounds}
            communityOptions={communities}
            mediumOptions={media}
            supplementOptions={supplements}
            initialValues={currentValues}
          />
        </div>
      );
    } else return <div />;
  }
}

SelectStep.propTypes = {
  pending: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  selectOptions: PropTypes.object.isRequired,
  currentValues: PropTypes.object,
  fetchEntityLists: PropTypes.func.isRequired,
  setExperimentOptions: PropTypes.func.isRequired,
  initializePlateMaps: PropTypes.func.isRequired,
  onStepComplete: PropTypes.func.isRequired,
};

const mapState = (state, props) => {
  const { pending, loaded, error, lists, selectOptions } = state.entityLists;
  return {
    pending,
    loaded,
    error,
    lists,
    selectOptions,
    currentValues: {
      experiment: state.createExperiment.experiment,
      plateSize: state.createExperiment.plateSize,
      ...state.createExperiment.components,
    },
  };
};

const connected = connect(
  mapState,
  { fetchEntityLists, initializePlateMaps, ...createExperimentActions }
)(SelectStep);
export { connected as SelectStep };
