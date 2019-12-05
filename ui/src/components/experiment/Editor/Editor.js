import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { fetchVersion } from '../../../store/experimentActions';
import { importPlates, initializePlates } from '../../../store/designActions';
import { selectActivePlate } from '../../../store/selectors';

class Editor extends Component {
  async componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    const version = await this.props.fetchVersion(
      params.status,
      params.version
    );
    await this.props.importPlates(version.plateMaps);
    this.props.initializePlates();
  }

  render() {
    const { plates, activePlate } = this.props;
    console.log(activePlate);
    return <div>Editor</div>;
  }
}

Editor.propTypes = {
  fetchVersion: PropTypes.func,
};

const mapState = (state, props) => {
  const activePlate = selectActivePlate(state);
  const { plates, clickMode } = state.designExperiment;
  return { activePlate, plates, clickMode };
};

const mapDispatch = {
  fetchVersion,
  importPlates,
  initializePlates,
};

const connected = connect(mapState, mapDispatch)(Editor);
export { connected as Editor };
