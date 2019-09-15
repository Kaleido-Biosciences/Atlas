import React, { Component } from 'react';
import { Icon, Modal, Header as SemanticHeader } from 'semantic-ui-react';

import { ImportComponents } from './ImportComponents';
import styles from './ComponentList.module.css';

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
      <div className={styles.header}>
        <div className={styles.headerContent}>Components</div>
        <Icon name="download" onClick={this.openModal} link />
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
