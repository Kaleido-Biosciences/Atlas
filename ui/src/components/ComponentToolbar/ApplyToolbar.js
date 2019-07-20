import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import memoize from 'memoize-one';
import { Header, Button } from 'semantic-ui-react';

import {
  createExperimentActions,
  selectActivePlateMap,
  selectSelectedWellsFromActivePlateMap,
} from '../../store/createExperiment';
import { ComponentSearch } from './ComponentSearch';
import { CommunitiesSection } from './sections/CommunitiesSection';
import { CompoundsSection } from './sections/CompoundsSection';
import { MediaSection } from './sections/MediaSection';
import { SupplementsSection } from './sections/SupplementsSection';
import { groupComponents } from '../../util';
import styles from './ApplyToolbar.module.css';

class ApplyToolbar extends Component {
  groupComponents = memoize(groupComponents);
  handleApplyClick = () => {
    const { activePlateMap } = this.props;
    this.props.onApplyClick({ plateMapId: activePlateMap.id });
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
        <div>
          <Header size="tiny">{headerText}</Header>
          {wellString}
        </div>
      );
    }
  }
  render() {
    const { components, selectedWells, onAddComponent } = this.props;
    const groupedComponents = this.groupComponents(components);
    const { communities, compounds, media, supplements } = groupedComponents;
    const showComponents = components.length > 0;
    return (
      <div className="apply-toolbar">
        <div className={styles.componentSearchContainer}>
          <ComponentSearch onSelect={onAddComponent} />
        </div>
        <div>
          {showComponents ? (
            <div className="components-container">
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
            </div>
          ) : (
            <div className={styles.noComponentsMessage}>
              Get started by searching for some components above.
            </div>
          )}
        </div>
        {selectedWells && selectedWells.length > 0 ? (
          <div className={styles.selectedWellsContainer}>
            {this.renderSelectedWells()}
            {showComponents ? (
              <div className={styles.applyButtonContainer}>
                <Button primary onClick={this.handleApplyClick}>
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
  components: PropTypes.array.isRequired,
  selectedWells: PropTypes.array.isRequired,
  activePlateMap: PropTypes.object,
  onAddComponent: PropTypes.func,
  onApplyClick: PropTypes.func,
};

const mapState = (state, props) => {
  const { components } = state.createExperiment;
  const selectedWells = selectSelectedWellsFromActivePlateMap(state);
  const activePlateMap = selectActivePlateMap(state);
  return { components, selectedWells, activePlateMap };
};

const mapDispatch = {
  onAddComponent: createExperimentActions.addComponents,
  onApplyClick: createExperimentActions.applySelectedComponentsToSelectedWells,
};

const connected = connect(
  mapState,
  mapDispatch
)(ApplyToolbar);
export { connected as ApplyToolbar };
