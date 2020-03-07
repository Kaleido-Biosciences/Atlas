import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Header, Button } from 'semantic-ui-react';

import { PlateSizeForm } from './PlateSizeForm';

export class AddPlateModal extends Component {
  handlePlateSizeChange = ({ containerGrid }) => {
    console.log(containerGrid);
  };
  render() {
    const { open, onClose } = this.props;
    return (
      <Modal open={open} onClose={onClose} closeIcon size="small">
        <Header icon="add circle" content="Add Plate" />
        <Modal.Content>
          <PlateSizeForm onChange={this.handlePlateSizeChange} />
        </Modal.Content>
        <Modal.Actions>
          <Button primary>Add Plate</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

AddPlateModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
