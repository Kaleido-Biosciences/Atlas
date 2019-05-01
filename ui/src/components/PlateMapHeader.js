import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class PlateMapHeader extends Component {
  handleClick = () => {
    const { headerType, index } = this.props;
    this.props.onClick({ headerType, index });
  };
  render() {
    const { label } = this.props;
    return (
      <th className={this.props.className} onClick={this.handleClick}>
        {label}
      </th>
    );
  }
}

PlateMapHeader.propTypes = {
  headerType: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func.isRequired,
};
