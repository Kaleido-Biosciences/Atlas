import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PopupButton } from '../PopupButton';
import { ClonePlateForm } from './ClonePlateForm';

export class ClonePlateButton extends Component {
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
        buttonContent="Clone plate"
        ref={this.popupRef}
      >
        <ClonePlateForm onSubmit={this.handleSubmit} />
      </PopupButton>
    );
  }
}

ClonePlateButton.propTypes = {
  onSubmit: PropTypes.func,
};
