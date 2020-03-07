import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Icon } from 'semantic-ui-react';

import { AddPlateModal } from './AddPlateModal';
import { AddRackModal } from './AddRackModal';
import { AddContainerModal } from './AddContainerModal';
import styles from './AddContainer.module.css';

export class AddContainerButton extends Component {
  state = {
    plateModalOpen: false,
    rackModalOpen: false,
    containerModalOpen: false,
  };
  openPlateModal = () => {
    this.setState({ plateModalOpen: true });
  };
  closePlateModal = () => {
    this.setState({ plateModalOpen: false });
  };
  openRackModal = () => {
    this.setState({ rackModalOpen: true });
  };
  closeRackModal = () => {
    this.setState({ rackModalOpen: false });
  };
  openContainerModal = () => {
    this.setState({ containerModalOpen: true });
  };
  closeContainerModal = () => {
    this.setState({ containerModalOpen: false });
  };
  handleAddContainerGrid = ({ containerGrid }) => {
    if (this.props.onAddContainerGrid) {
      this.props.onAddContainerGrid({ containerGrid });
    }
  };
  handleAddContainer = ({ container }) => {
    if (this.props.onAddContainer) {
      this.props.onAddContainer({ container });
    }
  };
  render() {
    const { plateModalOpen, rackModalOpen, containerModalOpen } = this.state;
    return (
      <div>
        <Dropdown
          trigger={
            <div className={styles.addContainerButton}>
              <Icon
                name="plus circle"
                link
                title="Add Container"
                size="large"
              />
            </div>
          }
          icon={null}
        >
          <Dropdown.Menu>
            <Dropdown.Item onClick={this.openPlateModal} text="Add Plate..." />
            <Dropdown.Item onClick={this.openRackModal} text="Add Rack..." />
            <Dropdown.Item
              onClick={this.openContainerModal}
              text="Add Container..."
            />
          </Dropdown.Menu>
        </Dropdown>
        <AddPlateModal
          open={plateModalOpen}
          onClose={this.closePlateModal}
          onAddClick={this.handleAddContainerGrid}
        />
        <AddRackModal
          open={rackModalOpen}
          onClose={this.closeRackModal}
          onAddClick={this.handleAddContainerGrid}
        />
        <AddContainerModal
          open={containerModalOpen}
          onClose={this.closeContainerModal}
          onAddClick={this.handleAddContainer}
        />
      </div>
    );
  }
}

AddContainerButton.propTypes = {
  onAddContainerGrid: PropTypes.func,
  onAddContainer: PropTypes.func,
};
