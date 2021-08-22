import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'KaptureApp/components';

export class Header extends Component {
  render() {
    return (
      <div className="h-12 w-full flex flex-row items-center pl-4 border-b border-gray-300">
        <div>{this.props.name}</div>
        <div>
          <Button content="Add Plates" secondary className="ml-4" />
          <Button content="Clone" secondary className="ml-2" />
          <Button content="Submit to Kapture" secondary className="ml-2" />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};
