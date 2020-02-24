import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Header, Button } from 'semantic-ui-react';

import { AddContainer } from './AddContainer';

export class AddContainerModal extends Component {
  state = {
    container: null,
    containerGrid: null,
  };
  handleChange = data => {
    if ('containerGrid' in data) {
      this.setState({ containerGrid: data.containerGrid, container: null });
    } else if ('container' in data) {
      this.setState({ container: data.container, containerGrid: null });
    }
  };
  handleAddContainer = () => {
    if (this.state.containerGrid) {
      if (this.props.onSubmitContainerGrid) {
        this.props.onSubmitContainerGrid({
          containerGrid: this.state.containerGrid,
        });
      }
    } else if (this.state.container) {
      if (this.props.onSubmitContainer) {
        this.props.onSubmitContainer({ container: this.state.container });
      }
    }
  };
  render() {
    const { open, onClose } = this.props;
    const submitDisabled =
      this.state.container || this.state.containerGrid ? false : true;
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
  onSubmitContainer: PropTypes.func,
  onSubmitContainerGrid: PropTypes.func,
};
