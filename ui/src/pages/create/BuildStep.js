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

  handleAddClick = () => {
    this.props.createPlateMap(this.props.plateSize);
  };

  render() {
    const { plateMaps, activePlateMapId, activePlateMap } = this.props;
    return (
      <Container fluid>
        <div className="build-container">
          <div className="build-plate-menu">
            <PlateMapMenu
              plateMaps={plateMaps}
              activePlateMapId={activePlateMapId}
              onMenuItemClick={this.props.setActivePlateMapId}
              onAddClick={this.handleAddClick}
            />
          </div>
          <div className="build-platemap">
            <PlateMap
              plateMap={activePlateMap}
              numberOfPlateMaps={plateMaps.length}
              onCreate={this.props.createPlateMap}
              onDelete={this.props.deletePlateMap}
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
  plateSize: PropTypes.number.isRequired,
  plateMaps: PropTypes.array.isRequired,
  activePlateMapId: PropTypes.number,
  createPlateMap: PropTypes.func.isRequired,
  deletePlateMap: PropTypes.func.isRequired,
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
