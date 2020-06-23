import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Icon } from 'semantic-ui-react';

import { AddPlatesModal } from './AddPlatesModal';
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
  handleAddPlates = (dimensions, quantity) => {
    if (this.props.onAddPlates) this.props.onAddPlates(dimensions, quantity);
    this.closeModals();
  };
  handleAddRack = ({ dimensions }) => {
    if (this.props.onAddRack) this.props.onAddRack({ dimensions });
    this.closeModals();
  };
  handleAddContainer = ({ containerType }) => {
    if (this.props.onAddContainer) this.props.onAddContainer({ containerType });
    this.closeModals();
  };
  render() {
    const { className, containerTypeOptions } = this.props;
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
            <Dropdown.Item onClick={this.openPlateModal} text="Add Plates..." />
            {/* <Dropdown.Item onClick={this.openRackModal} text="Add Rack..." />
            <Dropdown.Item
              onClick={this.openContainerModal}
              text="Add Container..."
            /> */}
          </Dropdown.Menu>
        </Dropdown>
        <AddPlatesModal
          open={plateModalOpen}
          onClose={this.closeModals}
          onAddClick={this.handleAddPlates}
        />
        <AddRackModal
          open={rackModalOpen}
          onClose={this.closeModals}
          onAddClick={this.handleAddRack}
        />
        <AddContainerModal
          open={containerModalOpen}
          onClose={this.closeModals}
          onAddClick={this.handleAddContainer}
          containerTypeOptions={containerTypeOptions}
        />
      </div>
    );
  }
}

AddContainerButton.propTypes = {
  className: PropTypes.string,
  onAddPlates: PropTypes.func,
  onAddRack: PropTypes.func,
  onAddContainer: PropTypes.func,
  containerTypeOptions: PropTypes.array,
};
