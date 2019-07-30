import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PopupButton } from './PopupButton';
import { ClonePlateMapForm } from './ClonePlateMapForm';

export class ClonePlateMapButton extends Component {
  popupRef = React.createRef();
  handleSubmit = data => {
    if (this.props.onSubmit) {
      this.props.onSubmit(data);
    }
    this.popupRef.current.handlePopupClose();
  };
  render() {
    return (
      <PopupButton
        buttonIcon="clone"
        buttonContent="Clone Plate"
        ref={this.popupRef}
      >
        <ClonePlateMapForm onSubmit={this.handleSubmit} />
      </PopupButton>
    );
  }
}

ClonePlateMapButton.propTypes = {
  onSubmit: PropTypes.func,
};
