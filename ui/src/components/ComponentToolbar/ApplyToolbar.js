import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';

import { createExperimentActions } from '../../store/createExperiment';
import { ComponentSection } from './ComponentSection';
import { ComponentSearch } from './ComponentSearch';
import { groupComponents } from '../../util';
import styles from './ApplyToolbar.module.css';

class ApplyToolbar extends Component {
  group = memoize(groupComponents);
  render() {
    const {
      components,
      onComponentSelect,
      onComponentDeselect,
      onComponentRemoveClick,
      onComponentAddTimepointClick,
      onComponentTimepointChange,
      onComponentTimepointDeleteClick,
      onAddComponent,
    } = this.props;
    const groupedComponents = this.group(components);
    const { communities, compounds, media, supplements } = groupedComponents;
    const showMessage = components.length === 0;
    return (
      <div className="apply-toolbar">
        <div className={styles.componentSearchContainer}>
          <ComponentSearch onSelect={onAddComponent} />
        </div>
        {showMessage ? (
          <div className={styles.noComponentsMessage}>
            Get started by searching for some components above.
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
                allowTimepointTimeChange={true}
                allowAddTimepoint={true}
                onRemoveClick={onComponentRemoveClick}
                onComponentAddTimepointClick={onComponentAddTimepointClick}
                onComponentTimepointChange={onComponentTimepointChange}
                onComponentTimepointDeleteClick={
                  onComponentTimepointDeleteClick
                }
              />
            )}
            {compounds.length > 0 && (
              <ComponentSection
                label="Compounds"
                components={compounds}
                onSelect={onComponentSelect}
                onDeselect={onComponentDeselect}
                showTimepoints={true}
                allowTimepointTimeChange={false}
                allowAddTimepoint={false}
                onRemoveClick={onComponentRemoveClick}
                onComponentAddTimepointClick={onComponentAddTimepointClick}
                onComponentTimepointChange={onComponentTimepointChange}
                onComponentTimepointDeleteClick={
                  onComponentTimepointDeleteClick
                }
              />
            )}
            {media.length > 0 && (
              <ComponentSection
                label="Media"
                components={media}
                onSelect={onComponentSelect}
                onDeselect={onComponentDeselect}
                showTimepoints={false}
                onRemoveClick={onComponentRemoveClick}
                onComponentAddTimepointClick={onComponentAddTimepointClick}
                onComponentTimepointChange={onComponentTimepointChange}
                onComponentTimepointDeleteClick={
                  onComponentTimepointDeleteClick
                }
              />
            )}
            {supplements.length > 0 && (
              <ComponentSection
                label="Supplement"
                components={supplements}
                onSelect={onComponentSelect}
                onDeselect={onComponentDeselect}
                showTimepoints={true}
                allowTimepointTimeChange={true}
                allowAddTimepoint={true}
                onRemoveClick={onComponentRemoveClick}
                onComponentAddTimepointClick={onComponentAddTimepointClick}
                onComponentTimepointChange={onComponentTimepointChange}
                onComponentTimepointDeleteClick={
                  onComponentTimepointDeleteClick
                }
              />
            )}
          </div>
        )}
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
  onComponentAddTimepointClick: PropTypes.func.isRequired,
  onComponentTimepointChange: PropTypes.func.isRequired,
  onComponentTimepointDeleteClick: PropTypes.func.isRequired,
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
  onComponentAddTimepointClick: createExperimentActions.addTimepointToComponent,
  onComponentTimepointChange: createExperimentActions.updateTimepoint,
  onComponentTimepointDeleteClick: createExperimentActions.deleteTimepoint,
};

const connected = connect(
  mapState,
  mapDispatch
)(ApplyToolbar);
export { connected as ApplyToolbar };
