import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Header, Button } from 'semantic-ui-react';

import { SingleContainerForm } from './SingleContainerForm';

export class AddContainerModal extends Component {
  state = {
    container: null,
  };
  handleContainerChange = ({ container }) => {
    this.setState({ container });
  };
  handleAddClick = () => {
    if (this.props.onAddClick) {
      this.props.onAddClick({ container: this.state.container });
    }
  };
  render() {
    const { open, onClose } = this.props;
    const addDisabled = this.state.container ? false : true;
    return (
      <Modal open={open} onClose={onClose} closeIcon size="small">
        <Header icon="add circle" content="Add Container" />
        <Modal.Content>
          <SingleContainerForm onChange={this.handleContainerChange} />
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
  onAddClick: PropTypes.func,
};