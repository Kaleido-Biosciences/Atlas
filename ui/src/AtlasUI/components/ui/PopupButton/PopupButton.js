import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popup, Button } from 'semantic-ui-react';

export class PopupButton extends Component {
  state = {
    popupOpen: false,
  };
  handlePopupOpen = () => {
    this.setState({ popupOpen: true });
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  };
  handlePopupClose = () => {
    this.setState({ popupOpen: false });
    if (this.props.onClose) {
      this.props.onClose();
    }
  };
  render() {
    const { buttonIcon, buttonContent, buttonColor, buttonSize } = this.props;
    return (
      <Popup
        trigger={
          <Button
            icon={buttonIcon}
            content={buttonContent}
            color={buttonColor}
            size={buttonSize}
          />
        }
        on="click"
        position="top right"
        open={this.state.popupOpen}
        onOpen={this.handlePopupOpen}
        onClose={this.handlePopupClose}
      >
        {this.props.children}
      </Popup>
    );
  }
}

PopupButton.defaultProps = {
  buttonSize: 'mini',
};

PopupButton.propTypes = {
  buttonIcon: PropTypes.string,
  buttonContent: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonSize: PropTypes.string,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};
