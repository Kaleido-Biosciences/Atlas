import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Header, Button } from 'semantic-ui-react';

import { RackSizeForm } from './RackSizeForm';

export class AddRackModal extends Component {
  state = {
    containerGrid: null,
  };
  handleSizeChange = ({ containerGrid }) => {
    this.setState({ containerGrid });
  };
  handleAddClick = () => {
    if (this.props.onAddClick) {
      this.props.onAddClick({ containerGrid: this.state.containerGrid });
    }
  };
  render() {
    const { open, onClose } = this.props;
    const addDisabled = this.state.containerGrid ? false : true;
    return (
      <Modal open={open} onClose={onClose} closeIcon size="small">
        <Header icon="add circle" content="Add Rack" />
        <Modal.Content>
          <RackSizeForm onChange={this.handleSizeChange} />
        </Modal.Content>
        <Modal.Actions>
          <Button primary disabled={addDisabled} onClick={this.handleAddClick}>
            Add Rack
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

AddRackModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onAddClick: PropTypes.func,
};
