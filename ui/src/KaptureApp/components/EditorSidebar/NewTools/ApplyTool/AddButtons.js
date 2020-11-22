import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import { AddComponentForm } from './AddComponentForm';
import { AddAttributeForm } from './AddAttributeForm';

export class AddButtons extends React.Component {
  state = {
    showAddComponentForm: false,
    showAddAttributeForm: false,
  };
  showAddComponentForm = () => {
    this.setState({
      showAddComponentForm: true,
      showAddAttributeForm: false,
    });
  };
  hideAddComponentForm = () => {
    this.setState({
      showAddComponentForm: false,
    });
  };
  showAddAttributeForm = () => {
    this.setState({
      showAddComponentForm: false,
      showAddAttributeForm: true,
    });
  };
  hideAddAttributeForm = () => {
    this.setState({
      showAddAttributeForm: false,
    });
  };
  render() {
    const { showAddComponentForm, showAddAttributeForm } = this.state;
    const { onComponentSearchChange } = this.props;
    return (
      <div>
        <Button onClick={this.showAddComponentForm}>Add Component</Button>
        <Button onClick={this.showAddAttributeForm}>Add Attribute</Button>
        {showAddComponentForm && (
          <AddComponentForm
            onSearchChange={onComponentSearchChange}
            onClose={this.hideAddComponentForm}
          />
        )}
        {showAddAttributeForm && (
          <AddAttributeForm onClose={this.hideAddAttributeForm} />
        )}
      </div>
    );
  }
}

AddButtons.propTypes = {
  onComponentSearchChange: PropTypes.func,
};
