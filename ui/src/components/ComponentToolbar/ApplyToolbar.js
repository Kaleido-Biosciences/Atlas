import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';

import { createExperimentActions } from '../../store/createExperiment';
import { ComponentSection } from './ComponentSection';
// import { CommunitiesForm } from './CommunitiesForm';
// import { CompoundsForm } from './CompoundsForm';
// import { MediaForm } from './MediaForm';
import { groupComponents } from '../../util';

class ApplyToolbar extends Component {
  group = memoize(groupComponents);
  render() {
    const {
      components,
      onComponentSelect,
      onComponentDeselect,
      onComponentRemoveClick,
    } = this.props;
    const groupedComponents = this.group(components);
    const { communities, compounds, media, supplements } = groupedComponents;
    const showMessage = components.length === 0;
    return (
      <div className="apply-toolbar">
        {showMessage ? (
          <div className="no-components-message">
            Get started by searching for some components.
          </div>
        ) : (
          <div className="components-container">
            {communities.length > 0 && (
              <ComponentSection
                label="Communities"
                components={communities}
                onSelect={onComponentSelect}
                onDeselect={onComponentDeselect}
                showTimepoints={true}
                showConcentration={true}
                onRemoveClick={onComponentRemoveClick}
              />
            )}
            {compounds.length > 0 && (
              <ComponentSection
                label="Compounds"
                components={compounds}
                onSelect={onComponentSelect}
                onDeselect={onComponentDeselect}
                showTimepoints={false}
                showConcentration={true}
                onRemoveClick={onComponentRemoveClick}
              />
            )}
            {media.length > 0 && (
              <ComponentSection
                label="Media"
                components={media}
                onSelect={onComponentSelect}
                onDeselect={onComponentDeselect}
                showTimepoints={false}
                showConcentration={false}
                onRemoveClick={onComponentRemoveClick}
              />
            )}
            {supplements.length > 0 && (
              <ComponentSection
                label="Supplement"
                components={supplements}
                onSelect={onComponentSelect}
                onDeselect={onComponentDeselect}
                showTimepoints={true}
                showConcentration={true}
                onRemoveClick={onComponentRemoveClick}
              />
            )}
          </div>
        )}
        {/* <CommunitiesForm
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
        /> */}
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
  onComponentRemoveClick: PropTypes.func.isRequired,
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
  onComponentRemoveClick: createExperimentActions.removeComponents,
};

const connected = connect(
  mapState,
  mapDispatch
)(ApplyToolbar);
export { connected as ApplyToolbar };
