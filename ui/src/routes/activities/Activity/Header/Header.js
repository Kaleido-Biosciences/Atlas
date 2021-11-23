import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'ui';
import memoize from 'memoize-one';
import dayjs from 'dayjs';

export class Header extends Component {
  getFormattedDate = memoize((updateDate) => {
    return dayjs(updateDate).utc().format('L LT');
  });
  render() {
    return (
      <div className="h-12 w-full flex flex-row flex-none items-center pl-4 border-b border-gray-300">
        <div>{this.props.name}</div>
        <div className="flex items-center">
          <Button content="Clone" icon="clone" secondary className="ml-2" />
          <Button
            content="Save to Kapture"
            icon="save"
            secondary
            className="ml-2"
            onClick={this.props.onSave}
          />
          <div className="text-xxs mt-px ml-3 text-gray-400">{`Last updated: ${this.getFormattedDate(
            this.props.updateDate
          )}`}</div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  onSave: PropTypes.func,
  updateDate: PropTypes.string,
};
