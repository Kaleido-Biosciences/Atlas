import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Container extends Component {
  render() {
    return <div>Container</div>;
  }
}

Container.propTypes = {
  container: PropTypes.object,
};
