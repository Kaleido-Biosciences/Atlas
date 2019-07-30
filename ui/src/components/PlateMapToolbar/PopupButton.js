import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popup, Button } from 'semantic-ui-react';

export class PopupButton extends Component {
  state = {
    popupOpen: false,
  };
  handlePopupOpen = () => {
    this.setState({ popupOpen: true });
  };
  handlePopupClose = () => {
    this.setState({ popupOpen: false });
  };
  render() {
    const { buttonIcon, buttonContent, buttonColor } = this.props;
    return (
      <Popup
        trigger={
          <Button
            icon={buttonIcon}
            content={buttonContent}
            color={buttonColor}
          />
        }
        on="click"
        position="bottom left"
        open={this.state.popupOpen}
        onOpen={this.handlePopupOpen}
        onClose={this.handlePopupClose}
      >
        {this.props.children}
      </Popup>
    );
  }
}

PopupButton.propTypes = {
  buttonIcon: PropTypes.string,
  buttonContent: PropTypes.string,
  buttonColor: PropTypes.string,
};
