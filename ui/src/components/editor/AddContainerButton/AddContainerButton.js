import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Icon } from 'semantic-ui-react';

import { AddPlateModal } from './AddPlateModal';
import { AddRackModal } from './AddRackModal';
import { AddContainerModal } from './AddContainerModal';

export class AddContainerButton extends Component {
  state = {
    plateModalOpen: false,
    rackModalOpen: false,
    containerModalOpen: false,
  };
  openPlateModal = () => {
    this.setState({ plateModalOpen: true });
  };
  openRackModal = () => {
    this.setState({ rackModalOpen: true });
  };
  openContainerModal = () => {
    this.setState({ containerModalOpen: true });
  };
  closeModals = () => {
    this.setState({
      plateModalOpen: false,
      rackModalOpen: false,
      containerModalOpen: false,
    });
  };
  handleAddContainerGrid = ({ containerGrid }) => {
    if (this.props.onAddContainerGrid) {
      this.props.onAddContainerGrid({ containerGrid });
    }
    this.closeModals();
  };
  handleAddContainer = ({ container }) => {
    if (this.props.onAddContainer) {
      this.props.onAddContainer({ container });
    }
    this.closeModals();
  };
  render() {
    const { className } = this.props;
    const { plateModalOpen, rackModalOpen, containerModalOpen } = this.state;
    return (
      <div>
        <Dropdown
          trigger={
            <div className={className}>
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
          onClose={this.closeModals}
          onAddClick={this.handleAddContainerGrid}
        />
        <AddRackModal
          open={rackModalOpen}
          onClose={this.closeModals}
          onAddClick={this.handleAddContainerGrid}
        />
        <AddContainerModal
          open={containerModalOpen}
          onClose={this.closeModals}
          onAddClick={this.handleAddContainer}
        />
      </div>
    );
  }
}

AddContainerButton.propTypes = {
  className: PropTypes.string,
  onAddContainerGrid: PropTypes.func,
  onAddContainer: PropTypes.func,
};
