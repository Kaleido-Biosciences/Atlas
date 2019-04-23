import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class Well extends Component {
  handleClick = () => {
    this.props.onClick(this.props.well.id);
  };
  render() {
    const { id, selected } = this.props.well;
    return (
      <div
        onClick={this.handleClick}
        className={classNames('well', { selected })}
      >
        {id}
      </div>
    );
  }
}

Well.propTypes = {
  well: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
