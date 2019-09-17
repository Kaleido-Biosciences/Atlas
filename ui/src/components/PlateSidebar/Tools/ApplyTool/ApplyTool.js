import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import memoize from 'memoize-one';

import { applySelectedToolComponentsToSelectedWells } from '../../../../store/experimentActions';
import {
  selectActivePlate,
  selectSelectedWellsFromActivePlate,
} from '../../../../store/selectors';
import { CommunitiesSection } from './CommunitiesSection';
import { CompoundsSection } from './CompoundsSection';
import { MediaSection } from './MediaSection';
import { SupplementsSection } from './SupplementsSection';
import { groupComponents } from '../../../../util';
import { SelectedWells } from './SelectedWells';
import styles from './ApplyTool.module.css';

class ApplyTool extends Component {
  groupComponents = memoize(groupComponents);
  handleApplyClick = () => {
    const { activePlate } = this.props;
    this.props.onApplyClick({ plateId: activePlate.id });
  };
  render() {
    const { toolComponents, toolComponentsValid, selectedWells } = this.props;
    const groupedComponents = this.groupComponents(toolComponents);
    const { communities, compounds, media, supplements } = groupedComponents;
    const showComponents = toolComponents.length > 0;
    return (
      <div className={styles.applyTool}>
        <div className={styles.componentsContainer}>
          {showComponents ? (
            <React.Fragment>
              {communities.length > 0 && (
                <CommunitiesSection communities={communities} />
              )}
              {compounds.length > 0 && (
                <CompoundsSection compounds={compounds} />
              )}
              {media.length > 0 && <MediaSection media={media} />}
              {supplements.length > 0 && (
                <SupplementsSection supplements={supplements} />
              )}
            </React.Fragment>
          ) : (
            <div className={styles.noComponentsMessage}>
              Add components by clicking on a component in the components list.
            </div>
          )}
        </div>
        {selectedWells && selectedWells.length > 0 ? (
          <div className={styles.selectedWellsContainer}>
            <SelectedWells
              selectedWells={selectedWells}
              showButton={showComponents}
              buttonDisabled={!toolComponentsValid}
              onApplyClick={this.handleApplyClick}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

ApplyTool.propTypes = {
  toolComponents: PropTypes.array.isRequired,
  toolComponentsValid: PropTypes.bool.isRequired,
  selectedWells: PropTypes.array.isRequired,
  activePlate: PropTypes.object,
  onApplyClick: PropTypes.func,
};

const mapState = (state, props) => {
  const { toolComponents, toolComponentsValid } = state.designExperiment;
  const selectedWells = selectSelectedWellsFromActivePlate(state);
  const activePlate = selectActivePlate(state);
  return {
    toolComponents,
    toolComponentsValid,
    selectedWells,
    activePlate,
  };
};

const mapDispatch = {
  onApplyClick: applySelectedToolComponentsToSelectedWells,
};

const connected = connect(
  mapState,
  mapDispatch
)(ApplyTool);
export { connected as ApplyTool };
