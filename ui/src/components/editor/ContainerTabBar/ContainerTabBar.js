import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Modal, Header } from 'semantic-ui-react';
import { Scrollbars } from 'react-custom-scrollbars';

import { ContainerTab } from './ContainerTab';
import { AddContainerForm } from './AddContainerForm';
import styles from './ContainerTabBar.module.css';

export class ContainerTabBar extends Component {
  state = {
    addContainerModalOpen: false,
  };
  openAddContainerModal = () => {
    this.setState({ addContainerModalOpen: true });
  };
  closeAddContainerModal = () => {
    this.setState({ addContainerModalOpen: false });
  };
  renderTabs() {
    const { containers, onTabClick } = this.props;
    if (containers && containers.length) {
      return containers.map((container, i) => {
        return (
          <ContainerTab
            key={container.id}
            container={container}
            onClick={onTabClick}
          />
        );
      });
    }
  }
  render() {
    const { addContainerModalOpen } = this.state;
    return (
      <div className={styles.containerTabBar}>
        <div className={styles.addIcon} onClick={this.openAddContainerModal}>
          <Icon name="plus circle" link title="Add Container" size="large" />
        </div>
        <div className={styles.scrollContainer}>
          <Scrollbars
            ref={this.setScrollbarsRef}
            style={{ height: '100%', width: '100%' }}
          >
            <div className={styles.tabContainer}>{this.renderTabs()}</div>
          </Scrollbars>
        </div>
        <Modal
          size="mini"
          open={addContainerModalOpen}
          onClose={this.closeAddContainerModal}
        >
          <Header icon="add circle" content="Add Container" />
          <Modal.Content>
            <AddContainerForm />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

ContainerTabBar.propTypes = {
  containers: PropTypes.array,
  activeContainer: PropTypes.object,
  onAddClick: PropTypes.func,
  onTabClick: PropTypes.func,
  onClone: PropTypes.func,
  onDelete: PropTypes.func,
};
