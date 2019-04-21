import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PlateMenu } from '../../components/PlateMenu';
import {
  createExperimentActions,
  initPlatemaps,
  createNewPlatemap,
} from '../../store/createExperiment';

class BuildStep extends Component {
  componentDidMount() {
    this.props.initPlatemaps(this.props.plateSize);
  }

  handleAddClick = () => {
    this.props.createNewPlatemap(this.props.plateSize);
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

BuildStep.propTypes = {
  initPlatemaps: PropTypes.func.isRequired,
  createNewPlatemap: PropTypes.func.isRequired,
  plateSize: PropTypes.number.isRequired,
  platemaps: PropTypes.array.isRequired,
  activePlatemapId: PropTypes.number.isRequired,
};

const mapState = (state, props) => {
  return state.createExperiment;
};

const connected = connect(
  mapState,
  { ...createExperimentActions, initPlatemaps, createNewPlatemap }
)(BuildStep);
export { connected as BuildStep };
