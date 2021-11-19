import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from './logo512.png';

export class Header extends Component {
  render() {
    return (
      <div className="flex h-full w-full bg-gray-800 text-white flex-row items-center justify-between">
        <div>
          <Link
            to="/"
            className="flex flex-row items-center text-sm text-white text-opacity-90"
          >
            <img src={logo} className="w-4 h-4 ml-4 mr-2" alt="Kaleido Logo" />
            Atlas
          </Link>
        </div>
        <div>
          <span className="mr-4 text-white text-xs text-opacity-40 text-xxs">
            Version {this.props.version}
          </span>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  version: PropTypes.string,
};
