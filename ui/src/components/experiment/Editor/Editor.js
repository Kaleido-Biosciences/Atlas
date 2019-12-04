import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { fetchVersion } from '../../../store/experimentActions';
import { importPlates } from '../../../store/designActions';

class Editor extends Component {
  async componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    const version = await this.props.fetchVersion(
      params.status,
      params.version
    );
    await this.props.importPlates(version.plateMaps);
  }

  render() {
    return <div>editor</div>;
  }
}

Editor.propTypes = {
  fetchVersion: PropTypes.func,
};

const mapState = (state, props) => {
  return {};
};

const mapDispatch = {
  fetchVersion,
  importPlates,
};

const connected = connect(mapState, mapDispatch)(Editor);
export { connected as Editor };
