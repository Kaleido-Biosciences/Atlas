import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import { PlateMapMenu } from '../../components/PlateMapMenu';
import { PlateMap } from '../../components/PlateMap';
import { Sidebar } from '../../components/Sidebar';

import {
  createExperimentActions,
  initPlateMaps,
  createPlateMap,
  selectActivePlateMap,
} from '../../store/createExperiment';

class BuildStep extends Component {
  componentWillMount() {
    // shouldnt happen here
    this.props.initPlateMaps(this.props.plateSize);
  }

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
  initPlateMaps: PropTypes.func.isRequired,
  createPlateMap: PropTypes.func.isRequired,
  deletePlateMap: PropTypes.func.isRequired,
  plateSize: PropTypes.number.isRequired,
  plateMaps: PropTypes.array.isRequired,
  activePlateMapId: PropTypes.number,
};

const mapState = (state, props) => {
  const activePlateMap = selectActivePlateMap(state);
  return { activePlateMap, ...state.createExperiment };
};

const connected = connect(
  mapState,
  { ...createExperimentActions, initPlateMaps, createPlateMap }
)(BuildStep);
export { connected as BuildStep };
