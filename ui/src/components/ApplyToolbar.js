import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ComponentSelect } from './ComponentSelect';
import { createExperimentActions } from '../store/createExperiment';

class ApplyToolbar extends Component {
  render() {
    const {
      communities,
      compounds,
      media,
      selectedCommunities,
      selectedCompounds,
      selectedMedia,
    } = this.props;
    return (
      <div className="apply-toolbar">
        <ComponentSelect
          type="communities"
          label="Communities"
          components={communities}
          selectedComponents={selectedCommunities}
          onSelect={this.props.onComponentSelect}
          onDeselect={this.props.onComponentDeselect}
        />
        <ComponentSelect
          type="compounds"
          label="Compounds"
          components={compounds}
          selectedComponents={selectedCompounds}
          onSelect={this.props.onComponentSelect}
          onDeselect={this.props.onComponentDeselect}
        />
        <ComponentSelect
          type="media"
          label="Media"
          components={media}
          selectedComponents={selectedMedia}
          onSelect={this.props.onComponentSelect}
          onDeselect={this.props.onComponentDeselect}
        />
      </div>
    );
  }
}

ApplyToolbar.propTypes = {
  communities: PropTypes.array.isRequired,
  compounds: PropTypes.array.isRequired,
  media: PropTypes.array.isRequired,
  selectedCommunities: PropTypes.array.isRequired,
  selectedCompounds: PropTypes.array.isRequired,
  selectedMedia: PropTypes.array.isRequired,
  onComponentSelect: PropTypes.func.isRequired,
  onComponentDeselect: PropTypes.func.isRequired,
};

const mapState = (state, props) => {
  const { components, selectedComponents } = state.createExperiment;
  return {
    communities: components.communities,
    compounds: components.compounds,
    media: components.media,
    selectedCommunities: selectedComponents.communities,
    selectedCompounds: selectedComponents.compounds,
    selectedMedia: selectedComponents.media,
  };
};

const mapDispatch = {
  onComponentSelect: createExperimentActions.selectComponents,
  onComponentDeselect: createExperimentActions.deselectComponents,
};

const connected = connect(
  mapState,
  mapDispatch
)(ApplyToolbar);
export { connected as ApplyToolbar };
