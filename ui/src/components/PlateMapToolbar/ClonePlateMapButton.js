import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popup, Button } from 'semantic-ui-react';

import { ClonePlateMapForm } from './ClonePlateMapForm';

export class ClonePlateMapButton extends Component {
  state = {
    popupOpen: false,
  };
  handlePopupOpen = () => {
    this.setState({ popupOpen: true });
  };
  handlePopupClose = () => {
    this.setState({ popupOpen: false });
  };
  handleCloneSubmit = data => {
    if (this.props.onSubmit) {
      this.props.onSubmit(data);
    }
    this.handlePopupClose();
  };
  render() {
    return (
      <Popup
        trigger={<Button icon="clone" content="Clone Plate" />}
        on="click"
        position="bottom left"
        open={this.state.popupOpen}
        onClose={this.handlePopupClose}
        onOpen={this.handlePopupOpen}
      >
        <ClonePlateMapForm onSubmit={this.handleCloneSubmit} />
      </Popup>
    );
  }
}

ClonePlateMapButton.propTypes = {
  onSubmit: PropTypes.func,
};
