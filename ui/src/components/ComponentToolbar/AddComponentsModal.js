import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Tab } from 'semantic-ui-react';

import { ImportComponents } from './ImportComponents';
import styles from './AddComponentsModal.module.css';

const panes = [
  {
    menuItem: 'Import',
    render: () => (
      <Tab.Pane attached={false}>
        <ImportComponents />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Search',
    render: () => <Tab.Pane attached={false}>Search here.</Tab.Pane>,
  },
];

export class AddComponentsModal extends Component {
  handleClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };
  render() {
    const { open } = this.props;
    return (
      <Modal
        dimmer="inverted"
        size="small"
        open={open}
        onClose={this.handleClose}
        className={styles.addComponentModal}
      >
        <Modal.Header>Add Components</Modal.Header>
        <Modal.Content>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </Modal.Content>
      </Modal>
    );
  }
}

AddComponentsModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
