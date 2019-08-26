import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class PlateHeader extends Component {
  handleClick = () => {
    const { headerType, index } = this.props;
    if (this.props.onClick) {
      this.props.onClick({ headerType, index });
    }
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

PlateHeader.propTypes = {
  headerType: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
};
