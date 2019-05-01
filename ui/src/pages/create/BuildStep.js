import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import { PlateMapMenu } from '../../components/PlateMapMenu';
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
    const { plateMaps, activePlateMap } = this.props;
    return (
      <Container fluid>
        <div className="build-container">
          <div className="build-plate-menu">
            <PlateMapMenu
              plateMaps={plateMaps}
              onMenuItemClick={this.props.setActivePlateMap}
              onAddClick={this.props.createPlateMap}
            />
          </div>
          <div className="build-platemap">
            {plateMaps.length > 0 && activePlateMap && (
              <PlateMap
                plateMap={activePlateMap}
                onWellsClick={this.handlePlateMapClick}
                onDeleteClick={this.props.deletePlateMap}
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
  setActivePlateMap: PropTypes.func.isRequired,
  createPlateMap: PropTypes.func.isRequired,
  deletePlateMap: PropTypes.func.isRequired,
  toggleWellsSelected: PropTypes.func.isRequired,
  setClickMode: PropTypes.func.isRequired,
};

const mapState = (state, props) => {
  const activePlateMap = selectActivePlateMap(state);
  return { activePlateMap, ...state.createExperiment };
};

const connected = connect(
  mapState,
  { ...createExperimentActions, createPlateMap }
)(BuildStep);
export { connected as BuildStep };
