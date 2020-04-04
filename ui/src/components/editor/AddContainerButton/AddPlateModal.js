import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Header, Button } from 'semantic-ui-react';

import { PlateSizeForm } from './PlateSizeForm';

export class AddPlateModal extends Component {
  state = {
    dimensions: null,
  };
  handleSizeChange = ({ dimensions }) => {
    this.setState({ dimensions });
  };
  handleAddClick = () => {
    if (this.props.onAddClick) {
      this.props.onAddClick({
        dimensions: this.state.dimensions,
      });
    }
  };
  render() {
    const { open, onClose } = this.props;
    const addDisabled = this.state.dimensions ? false : true;
    return (
      <Modal open={open} onClose={onClose} closeIcon size="small">
        <Header icon="add circle" content="Add Plate" />
        <Modal.Content>
          <PlateSizeForm onChange={this.handleSizeChange} />
        </Modal.Content>
        <Modal.Actions>
          <Button primary disabled={addDisabled} onClick={this.handleAddClick}>
            Add Plate
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

AddPlateModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onAddClick: PropTypes.func,
};
