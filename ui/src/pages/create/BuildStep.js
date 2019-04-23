import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import { PlateMapMenu } from '../../components/PlateMapMenu';
import { PlateMap } from '../../components/PlateMap';
import { Sidebar } from '../../components/Sidebar';

import {
  createExperimentActions,
  createPlateMap,
  selectActivePlateMap,
} from '../../store/createExperiment';

class BuildStep extends Component {
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
            <PlateMap
              plateMap={activePlateMap}
              numberOfPlateMaps={plateMaps.length}
              onAddClick={this.props.createPlateMap}
              onDeleteClick={this.props.deletePlateMap}
              onWellClick={this.props.toggleWellSelected}
            />
          </div>
          <div className="build-sidebar">
            <Sidebar />
          </div>
        </div>
      </Container>
    );
  }
}

BuildStep.propTypes = {
  plateMaps: PropTypes.array.isRequired,
  activePlateMap: PropTypes.object,
  setActivePlateMap: PropTypes.func.isRequired,
  createPlateMap: PropTypes.func.isRequired,
  deletePlateMap: PropTypes.func.isRequired,
  toggleWellSelected: PropTypes.func.isRequired,
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
