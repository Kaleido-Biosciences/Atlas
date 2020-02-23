import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Header, Button } from 'semantic-ui-react';

import { AddContainer } from './AddContainer';

export class AddContainerModal extends Component {
  state = {
    container: null,
  };
  handleChange = ({ container }) => {
    this.setState({ container });
  };
  handleAddContainer = () => {
    if (this.props.onSubmit) {
      this.props.onSubmit({ container: this.state.container });
    }
  };
  render() {
    const { open, onClose } = this.props;
    const submitDisabled = this.state.container ? false : true;
    return (
      <Modal open={open} onClose={onClose} closeIcon size="small">
        <Header icon="add circle" content="Add Container" />
        <Modal.Content>
          <AddContainer onChange={this.handleChange} />
        </Modal.Content>
        <Modal.Actions>
          <Button
            primary
            disabled={submitDisabled}
            onClick={this.handleAddContainer}
          >
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
  onSubmit: PropTypes.func,
};
