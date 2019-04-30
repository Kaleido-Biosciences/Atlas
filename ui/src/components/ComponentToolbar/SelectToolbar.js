import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { selectSelectedWells } from '../../store/createExperiment';

class SelectToolbar extends Component {
  render() {
    const { selectedWells } = this.props;
    const wellNames = selectedWells.map(well => well.name);
    const wellString = wellNames.join(', ');
    return <div>Selected wells: {wellString}</div>;
  }
}

SelectToolbar.propTypes = {
  selectedWells: PropTypes.array.isRequired,
};

const mapState = (state, props) => {
  const selectedWells = selectSelectedWells(state);
  return { selectedWells };
};

const connected = connect(
  mapState,
  null
)(SelectToolbar);
export { connected as SelectToolbar };
