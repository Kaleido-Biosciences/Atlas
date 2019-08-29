import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

export class ComponentList extends Component {
  render() {
    return (
      <div>
        <Button onClick={this.show}>Add</Button>
        Component List
      </div>
    );
  }
}
