import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Header, Button } from 'semantic-ui-react';

import { SingleContainerForm } from './SingleContainerForm';

export class AddContainerModal extends Component {
  handleContainerChange = ({ container }) => {
    console.log(container);
  };
  render() {
    const { open, onClose } = this.props;
    return (
      <Modal open={open} onClose={onClose} closeIcon size="small">
        <Header icon="add circle" content="Add Container" />
        <Modal.Content>
          <SingleContainerForm onChange={this.handleContainerChange} />
        </Modal.Content>
        <Modal.Actions>
          <Button primary>Add Container</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

AddContainerModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
