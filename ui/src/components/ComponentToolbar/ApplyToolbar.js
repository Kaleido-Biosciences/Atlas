import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createExperimentActions } from '../../store/createExperiment';
import { CommunitiesForm } from './CommunitiesForm';
import { CompoundsForm } from './CompoundsForm';
import { MediaForm } from './MediaForm';

const groupComponents = components => {
  const groups = {
    communities: [],
    compounds: [],
    media: [],
    supplements: [],
  };
  components.forEach(component => {
    let key;
    if (component.type === 'community') {
      key = 'communities';
    } else if (component.type === 'compound') {
      key = 'compounds';
    } else if (component.type === 'medium') {
      key = 'media';
    } else if (component.type === 'supplement') {
      key = 'supplements';
    }
    groups[key].push(component);
  });
  return groups;
};

class ApplyToolbar extends Component {
  render() {
    const { components } = this.props;
    const { communities, compounds, media, supplements } = groupComponents(
      components
    );
    return (
      <div className="apply-toolbar">
        <CommunitiesForm
          communities={communities}
          onSelect={this.props.onComponentSelect}
          onDeselect={this.props.onComponentDeselect}
          onConcentrationClick={this.props.onConcentrationClick}
          onConcentrationBlur={this.props.onConcentrationBlur}
          onConcentrationSave={this.props.onConcentrationSave}
        />
        <CompoundsForm
          compounds={compounds}
          onSelect={this.props.onComponentSelect}
          onDeselect={this.props.onComponentDeselect}
          onConcentrationClick={this.props.onConcentrationClick}
          onConcentrationBlur={this.props.onConcentrationBlur}
          onConcentrationSave={this.props.onConcentrationSave}
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
  components: PropTypes.array.isRequired,
  onComponentSelect: PropTypes.func.isRequired,
  onComponentDeselect: PropTypes.func.isRequired,
  onConcentrationClick: PropTypes.func.isRequired,
  onConcentrationSave: PropTypes.func.isRequired,
};

const mapState = (state, props) => {
  const { components } = state.createExperiment;
  return {
    components,
  };
};

const mapDispatch = {
  onComponentSelect: createExperimentActions.selectComponents,
  onComponentDeselect: createExperimentActions.deselectComponents,
  onConcentrationClick: createExperimentActions.toggleComponentEditing,
  onConcentrationBlur: createExperimentActions.toggleComponentEditing,
  onConcentrationSave: createExperimentActions.setComponentConcentration,
};

const connected = connect(
  mapState,
  mapDispatch
)(ApplyToolbar);
export { connected as ApplyToolbar };
