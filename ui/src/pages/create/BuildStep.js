import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

// import { PlateMapMenu } from '../../components/PlateMapMenu';
import { PlateMapToolbar } from '../../components/PlateMapToolbar';
import { PlateMap } from '../../components/PlateMap';
import { ComponentToolbar } from '../../components/ComponentToolbar/ComponentToolbar';
import { NoPlateMapsMessage } from '../../components/NoPlateMapsMessage';

import {
  createExperimentActions,
  createPlateMap,
  selectActivePlateMap,
} from '../../store/createExperiment';

class BuildStep extends Component {
  handleClickModeChange = clickMode => {
    this.props.setClickMode(clickMode);
    this.props.clearSelectedWells({ plateMapId: this.props.activePlateMap.id });
  };
  handlePlateMapClick = data => {
    const { clickMode } = this.props;
    if (clickMode === 'apply') {
      this.props.applySelectedComponentsToWells(data);
    }
    if (clickMode === 'clear') {
      this.props.clearWells(data);
    }
    if (clickMode === 'select') {
      this.props.toggleWellsSelected(data);
    }
  };
  render() {
    const { plateMaps, activePlateMap, highlightedComponents } = this.props;
    return (
      <Container fluid>
        <div className="build-container">
          {/* <div className="build-plate-menu">
            <PlateMapMenu
              plateMaps={plateMaps}
              onMenuItemClick={this.props.setActivePlateMap}
              onAddClick={this.props.createPlateMap}
            />
          </div> */}
          <div className="build-platemap">
            {plateMaps.length > 0 && activePlateMap && (
              <PlateMapToolbar
                plateMaps={plateMaps}
                activePlateMap={activePlateMap}
                highlightedComponents={highlightedComponents}
                onDeleteClick={this.props.deletePlateMap}
                onHighlightClick={this.props.toggleHighlight}
                onAddClick={this.props.createPlateMap}
                onPlateMapChange={this.props.setActivePlateMap}
              />
            )}
            {plateMaps.length > 0 && activePlateMap && (
              <PlateMap
                plateMap={activePlateMap}
                onWellsClick={this.handlePlateMapClick}
              />
            )}
            {!plateMaps.length && (
              <NoPlateMapsMessage onAddClick={this.props.createPlateMap} />
            )}
          </div>
          <div className="build-sidebar">
            <ComponentToolbar onTabChange={this.handleClickModeChange} />
          </div>
        </div>
      </Container>
    );
  }
}

BuildStep.propTypes = {
  plateMaps: PropTypes.array.isRequired,
  activePlateMap: PropTypes.object,
  clickMode: PropTypes.string.isRequired,
  highlightedComponents: PropTypes.array.isRequired,
  setActivePlateMap: PropTypes.func.isRequired,
  createPlateMap: PropTypes.func.isRequired,
  deletePlateMap: PropTypes.func.isRequired,
  toggleWellsSelected: PropTypes.func.isRequired,
  setClickMode: PropTypes.func.isRequired,
  clearSelectedWells: PropTypes.func.isRequired,
  applySelectedComponentsToWells: PropTypes.func.isRequired,
  clearWells: PropTypes.func.isRequired,
  toggleHighlight: PropTypes.func.isRequired,
};

const mapState = (state, props) => {
  const activePlateMap = selectActivePlateMap(state);
  const {
    plateMaps,
    clickMode,
    highlightedComponents,
  } = state.createExperiment;
  return { activePlateMap, plateMaps, clickMode, highlightedComponents };
};

const mapDispatch = {
  setActivePlateMap: createExperimentActions.setActivePlateMap,
  createPlateMap: createPlateMap,
  deletePlateMap: createExperimentActions.deletePlateMap,
  toggleWellsSelected: createExperimentActions.toggleWellsSelected,
  setClickMode: createExperimentActions.setClickMode,
  clearSelectedWells: createExperimentActions.clearSelectedWells,
  applySelectedComponentsToWells:
    createExperimentActions.applySelectedComponentsToWells,
  clearWells: createExperimentActions.clearWells,
  toggleHighlight: createExperimentActions.toggleHighlight,
};

const connected = connect(
  mapState,
  mapDispatch
)(BuildStep);
export { connected as BuildStep };
