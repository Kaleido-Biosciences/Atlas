import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

import { ImportComponents } from './ImportComponents';
import styles from './ComponentList.module.css';

export class Header extends Component {
  state = {
    modalOpen: false,
  };
  openImportComponentsModal = () => {
    this.setState({ modalOpen: true });
  };
  closeImportComponentsModal = () => {
    if (this.props.onImportModalClose) {
      this.props.onImportModalClose();
    }
    this.setState({ modalOpen: false });
  };
  render() {
    const { modalOpen } = this.state;
    return (
      <div className={styles.header}>
        <div className={styles.headerContent}>Components</div>
        <Icon
          name="download"
          onClick={this.openImportComponentsModal}
          link
          title="Import Components"
        />
        <ImportComponents
          open={modalOpen}
          onClose={this.closeImportComponentsModal}
        />
      </div>
    );
  }
}

Header.propTypes = {
  onImportModalClose: PropTypes.func,
};
