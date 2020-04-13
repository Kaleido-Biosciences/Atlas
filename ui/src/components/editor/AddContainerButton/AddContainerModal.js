import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Header, Button } from 'semantic-ui-react';

import { SingleContainerForm } from './SingleContainerForm';

export class AddContainerModal extends Component {
  state = {
    containerType: null,
  };
  handleContainerChange = ({ containerType }) => {
    this.setState({ containerType });
  };
  handleAddClick = () => {
    if (this.props.onAddClick) {
      this.props.onAddClick({
        containerType: this.state.containerType,
      });
    }
  };
  handleClose = () => {
    if (this.props.onClose) this.props.onClose();
  };
  handleModalUnmount = () => {
    this.setState({ containerType: null });
  };
  render() {
    const { open, containerTypeOptions } = this.props;
    const addDisabled = this.state.containerType ? false : true;
    return (
      <Modal
        open={open}
        onClose={this.handleClose}
        onUnmount={this.handleModalUnmount}
        closeIcon
        size="small"
      >
        <Header icon="add circle" content="Add Container" />
        <Modal.Content>
          <SingleContainerForm
            onChange={this.handleContainerChange}
            options={containerTypeOptions}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button primary disabled={addDisabled} onClick={this.handleAddClick}>
            Add Container
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

AddContainerModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  containerTypeOptions: PropTypes.array,
  onAddClick: PropTypes.func,
};
