import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import memoize from 'memoize-one';
import { Header, Button } from 'semantic-ui-react';
import SplitPane from 'react-split-pane';

import {
  applySelectedToolComponentsToSelectedWells,
  addComponentToToolComponents,
} from '../../store/experimentActions';
import {
  selectActivePlate,
  selectSelectedWellsFromActivePlate,
} from '../../store/selectors';
import { CommunitiesSection } from './sections/CommunitiesSection';
import { CompoundsSection } from './sections/CompoundsSection';
import { MediaSection } from './sections/MediaSection';
import { SupplementsSection } from './sections/SupplementsSection';
import { groupComponents } from '../../util';
import styles from './ApplyToolbar.module.css';

class ApplyToolbar extends Component {
  groupComponents = memoize(groupComponents);
  handleApplyClick = () => {
    const { activePlate } = this.props;
    this.props.onApplyClick({ plateId: activePlate.id });
  };
  renderSelectedWells() {
    const { selectedWells } = this.props;
    if (selectedWells) {
      let wellString = null,
        headerText;
      if (selectedWells.length > 0) {
        const wellNames = selectedWells.map(well => well.name);
        wellString = wellNames.join(', ');
        headerText = 'Selected Wells:';
      } else {
        headerText = 'No wells selected.';
      }
      return (
        <div className={styles.selectedWells}>
          <Header size="tiny">{headerText}</Header>
          {wellString}
        </div>
      );
    }
  }
  render() {
    const { toolComponents, toolComponentsValid, selectedWells } = this.props;
    const groupedComponents = this.groupComponents(toolComponents);
    const { communities, compounds, media, supplements } = groupedComponents;
    const showComponents = toolComponents.length > 0;
    return (
      <div className={styles.applyToolbar}>
        <div className={styles.componentsContainer}>
          {showComponents ? (
            <React.Fragment>
              <h5 className={styles.toolbarHeader}>Palette</h5>
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
              Get started by adding some components.
            </div>
          )}
        </div>

        {selectedWells && selectedWells.length > 0 ? (
          <div className={styles.selectedWellsContainer}>
            {this.renderSelectedWells()}
            {showComponents ? (
              <div className={styles.applyButtonContainer}>
                <Button
                  disabled={!toolComponentsValid}
                  primary
                  onClick={this.handleApplyClick}
                >
                  Apply to {selectedWells.length} wells
                </Button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

ApplyToolbar.propTypes = {
  toolComponents: PropTypes.array.isRequired,
  toolComponentsValid: PropTypes.bool.isRequired,
  selectedWells: PropTypes.array.isRequired,
  activePlate: PropTypes.object,
  onApplyClick: PropTypes.func,
  onComponentListClick: PropTypes.func,
};

const mapState = (state, props) => {
  const {
    toolComponents,
    componentList,
    toolComponentsValid,
  } = state.designExperiment;
  const selectedWells = selectSelectedWellsFromActivePlate(state);
  const activePlate = selectActivePlate(state);
  return {
    toolComponents,
    componentList,
    toolComponentsValid,
    selectedWells,
    activePlate,
  };
};

const mapDispatch = {
  onApplyClick: applySelectedToolComponentsToSelectedWells,
  onComponentListClick: addComponentToToolComponents,
};

const connected = connect(
  mapState,
  mapDispatch
)(ApplyToolbar);
export { connected as ApplyToolbar };
