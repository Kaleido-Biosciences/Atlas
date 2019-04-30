import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createExperimentActions } from '../../store/createExperiment';
import { CommunitiesForm } from './CommunitiesForm';
import { CompoundsForm } from './CompoundsForm';
import { MediaForm } from './MediaForm';

class ApplyToolbar extends Component {
  render() {
    const { communities, compounds, media } = this.props;
    return (
      <div className="apply-toolbar">
        <CommunitiesForm
          communities={communities}
          onSelect={this.props.onComponentSelect}
          onDeselect={this.props.onComponentDeselect}
        />
        <CompoundsForm
          compounds={compounds}
          onSelect={this.props.onComponentSelect}
          onDeselect={this.props.onComponentDeselect}
        />
        <MediaForm
          media={media}
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
  onComponentSelect: PropTypes.func.isRequired,
  onComponentDeselect: PropTypes.func.isRequired,
};

const mapState = (state, props) => {
  const { selectedComponents } = state.createExperiment;
  return {
    communities: selectedComponents.communities,
    compounds: selectedComponents.compounds,
    media: selectedComponents.media,
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
