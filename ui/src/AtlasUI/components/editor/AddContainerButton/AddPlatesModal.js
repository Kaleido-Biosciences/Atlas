import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Header, Button, Form, Input } from 'semantic-ui-react';

import { PlateSizeForm } from './PlateSizeForm';

const initialState = {
  dimensions: null,
  quantity: 1,
};

export class AddPlatesModal extends Component {
  state = initialState;
  handleSizeChange = ({ dimensions }) => {
    this.setState({ dimensions });
  };
  handleQuantityChange = (e, { value }) => {
    if (value) this.setState({ quantity: parseInt(value) });
    else this.setState({ quantity: '' });
  };
  handleAddClick = () => {
    if (this.props.onAddClick) {
      const dimensions = { ...this.state.dimensions };
      this.props.onAddClick(dimensions, this.state.quantity);
    }
  };
  handleClose = () => {
    if (this.props.onClose) this.props.onClose();
  };
  handleUnmount = () => {
    this.setState(initialState);
  };
  checkStateValid = () => {
    return (
      this.state.dimensions &&
      this.state.quantity &&
      this.state.quantity >= 1 &&
      Number.isInteger(this.state.quantity)
    );
  };
  render() {
    const { open } = this.props;
    const addDisabled = !this.checkStateValid();
    return (
      <Modal
        open={open}
        onClose={this.handleClose}
        onUnmount={this.handleUnmount}
        closeIcon
        size="small"
      >
        <Header icon="add circle" content="Add Plates" />
        <Modal.Content>
          <PlateSizeForm onChange={this.handleSizeChange} />
          <Form style={{ marginTop: '1em' }}>
            <Form.Field>
              <label>Quantity</label>
              <Input
                onChange={this.handleQuantityChange}
                value={this.state.quantity}
                type="number"
                autoFocus
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button primary disabled={addDisabled} onClick={this.handleAddClick}>
            Add Plates
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

AddPlatesModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onAddClick: PropTypes.func,
};
