import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import { PlateMenu } from '../../components/PlateMenu';
import { Platemap } from '../../components/Platemap';
import { Sidebar } from '../../components/Sidebar';

import {
  createExperimentActions,
  initPlatemaps,
  createNewPlatemap,
  selectActivePlatemap,
} from '../../store/createExperiment';

class BuildStep extends Component {
  componentWillMount() {
    this.props.initPlatemaps(this.props.plateSize);
  }

  handleAddClick = () => {
    this.props.createNewPlatemap(this.props.plateSize);
  };

  render() {
    const { platemaps, activePlatemapId, activePlatemap } = this.props;
    return (
      <Container fluid>
        <div className="build-container">
          <div className="build-plate-menu">
            <PlateMenu
              platemaps={platemaps}
              activePlatemapId={activePlatemapId}
              onMenuItemClick={this.props.setActivePlatemapId}
              onAddClick={this.handleAddClick}
            />
          </div>
          <div className="build-platemap">
            {activePlatemap && <Platemap platemap={activePlatemap} />}
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
  initPlatemaps: PropTypes.func.isRequired,
  createNewPlatemap: PropTypes.func.isRequired,
  plateSize: PropTypes.number.isRequired,
  platemaps: PropTypes.array.isRequired,
  activePlatemapId: PropTypes.number,
};

const mapState = (state, props) => {
  const activePlatemap = selectActivePlatemap(state);
  return {activePlatemap, ...state.createExperiment};
};

const connected = connect(
  mapState,
  { ...createExperimentActions, initPlatemaps, createNewPlatemap }
)(BuildStep);
export { connected as BuildStep };
