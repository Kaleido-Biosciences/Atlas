import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, TextArea, Modal } from 'semantic-ui-react';

export class AddComponentsModal extends Component {
  handleClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };
  handleChange = (e, data) => {
    console.log(data.value.trim().split(/\r|\n/));
  };
  render() {
    const { open } = this.props;
    return (
      <Modal dimmer="inverted" open={open} onClose={this.handleClose}>
        <Modal.Header>Add Components</Modal.Header>
        <Modal.Content>
          <Form>
            <TextArea
              placeholder="Enter components"
              onChange={this.handleChange}
            />
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

AddComponentsModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
