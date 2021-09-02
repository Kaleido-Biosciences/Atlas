import React, { Component } from 'react';
import { Grid } from 'AtlasUI/components';

export class Editor extends Component {
  render() {
    const grid = this.props.view.data.grids[0];
    return (
      <Grid
        containerTypeOptions={this.props.containerTypeOptions}
        grid={grid}
        settings={this.props.settings}
        onClick={this.props.onContainerClick}
      />
    );
  }
}
