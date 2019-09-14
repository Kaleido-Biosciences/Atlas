import React, { Component } from 'react';
import { Icon, Modal, Header as SemanticHeader } from 'semantic-ui-react';

import { ImportComponents } from './ImportComponents';

export class Header extends Component {
  state = {
    modalOpen: false,
  };
  openModal = () => {
    this.setState({ modalOpen: true });
  };
  closeModal = () => {
    this.setState({ modalOpen: false });
  };
  render() {
    const { modalOpen } = this.state;
    return (
      <div>
        Components <Icon name="download" onClick={this.openModal} />
        <Modal
          open={modalOpen}
          onClose={this.closeModal}
          centered={false}
          closeIcon
        >
          <SemanticHeader icon="download" content="Import Components" />
          <Modal.Content>
            <ImportComponents />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
