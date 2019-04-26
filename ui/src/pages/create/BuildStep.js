import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import { PlateMapMenu } from '../../components/PlateMapMenu';
import { PlateMap } from '../../components/PlateMap';
import { ComponentToolbar } from '../../components/ComponentToolbar';
import { NoPlateMapsMessage } from '../../components/NoPlateMapsMessage';

import {
  createExperimentActions,
  createPlateMap,
  selectActivePlateMap,
} from '../../store/createExperiment';

class BuildStep extends Component {
  handleClickModeChange = clickMode => {
    this.props.setClickMode(clickMode);
  };
  render() {
    const { plateMaps, activePlateMap, clickMode } = this.props;
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
            {plateMaps.length ? (
              <PlateMap
                plateMap={activePlateMap}
                onDeleteClick={this.props.deletePlateMap}
                onWellClick={this.props.toggleWellSelected}
                clickMode={this.props.clickMode}
                valuesToApply={this.props.selectedComponents}
                modifyWells={this.props.modifyWells}
                clearMode={this.props.clearMode}
              />
            ) : (
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
  clearMode: PropTypes.string,
  setActivePlateMap: PropTypes.func.isRequired,
  createPlateMap: PropTypes.func.isRequired,
  deletePlateMap: PropTypes.func.isRequired,
  toggleWellSelected: PropTypes.func.isRequired,
  setClickMode: PropTypes.func.isRequired,
  modifyWells: PropTypes.func.isRequired,
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
