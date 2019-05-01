import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

export class PlateMapToolbar extends Component {
  handleDelete = () => {
    this.props.onDeleteClick(this.props.activePlateMap.id);
  };
  render() {
    return (
      <div className="platemap-toolbar">
        <div>
          <Button
            compact
            icon="trash"
            content="Delete"
            onClick={this.handleDelete}
          />
        </div>
      </div>
    );
  }
}

PlateMapToolbar.propTypes = {
  activePlateMap: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};
