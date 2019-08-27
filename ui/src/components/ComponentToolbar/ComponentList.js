import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

import { AddComponentsModal } from './AddComponentsModal';

export class ComponentList extends Component {
  state = { open: false };
  show = () => this.setState({ open: true });
  close = () => this.setState({ open: false });
  render() {
    const { open } = this.state;
    return (
      <div>
        <Button onClick={this.show}>Add</Button>
        Component List
        <AddComponentsModal open={open} onClose={this.close} />
      </div>
    );
  }
}
