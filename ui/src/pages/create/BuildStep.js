import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PlateMenu } from '../../components/PlateMenu';
import {
  createExperimentActions,
  createNewPlatemap,
  createFirstPlate,
} from '../../store/createExperiment';

class BuildStep extends Component {
  componentDidMount() {
    this.props.createFirstPlate();
  }

  handleAddClick = () => {
    this.props.createNewPlatemap(96);
  };

  render() {
    const { platemaps, activePlatemapId } = this.props;
    return (
      <div>
        <PlateMenu
          platemaps={platemaps}
          activePlatemapId={activePlatemapId}
          onMenuItemClick={this.props.setActivePlatemapId}
          onAddClick={this.handleAddClick}
        />
      </div>
    );
  }
}

const mapState = (state, props) => {
  return state.createExperiment;
};

const connected = connect(
  mapState,
  { ...createExperimentActions, createNewPlatemap, createFirstPlate }
)(BuildStep);
export { connected as BuildStep };
