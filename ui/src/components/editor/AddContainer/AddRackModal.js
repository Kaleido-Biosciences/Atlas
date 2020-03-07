import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Header, Button } from 'semantic-ui-react';

import { RackSizeForm } from './RackSizeForm';

export class AddRackModal extends Component {
  handleRackSizeChange = ({ containerGrid }) => {
    console.log(containerGrid);
  };
  render() {
    const { open, onClose } = this.props;
    return (
      <Modal open={open} onClose={onClose} closeIcon size="small">
        <Header icon="add circle" content="Add Rack" />
        <Modal.Content>
          <RackSizeForm onChange={this.handleRackSizeChange} />
        </Modal.Content>
        <Modal.Actions>
          <Button primary>Add Rack</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

AddRackModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
