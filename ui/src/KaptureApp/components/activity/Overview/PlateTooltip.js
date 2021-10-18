import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

export class PlateTooltip extends Component {
  render() {
    return (
      <ReactTooltip
        backgroundColor="#FFF"
        border={true}
        borderColor="#d4d4d5"
        className="reactTooltip"
        id={this.props.id}
        type="info"
      >
        <div className="px-2 py-2 whitespace-nowrap text-xxs">
          Plate {this.props.plate.plateNumber}
        </div>
      </ReactTooltip>
    );
  }
}

PlateTooltip.propTypes = {
  id: PropTypes.string,
  plate: PropTypes.object,
};
