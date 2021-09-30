import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditableText } from 'KaptureApp/components';

export class Header extends Component {
  handleSaveName = (value) => {
    if (this.props.onSaveName) {
      this.props.onSaveName(this.props.plate.id, value);
    }
  };
  render() {
    return (
      <div className="h-10 bg-gray-50 pl-4 flex flex-row items-center border-b border-gray-100 text-sm">
        <EditableText
          onSave={this.handleSaveName}
          value={this.props.plate.name}
        />
      </div>
    );
  }
}

Header.propTypes = {
  onSaveName: PropTypes.func,
  plate: PropTypes.object,
};
