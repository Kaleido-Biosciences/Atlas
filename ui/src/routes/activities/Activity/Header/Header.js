import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'ui';
import memoize from 'memoize-one';
import dayjs from 'dayjs';

export class Header extends Component {
  getFormattedDate = memoize((updateDate) => {
    return dayjs(updateDate).format('L LT');
  });
  render() {
    return (
      <div className="h-12 w-full flex flex-row flex-none items-center justify-between pl-4 border-b border-gray-300">
        <div className="flex flex-row items-center">
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
        {process.env.NODE_ENV === `development` ? (
          <div className="flex flex-row items-center pr-3">
            <div className="text-xxs mr-2 mt-px">
              {this.props.deleteActivityStatus}
            </div>
            <Button
              content="Delete Activity"
              icon="trash"
              secondary
              onClick={this.props.onDeleteActivity}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

Header.propTypes = {
  deleteActivityStatus: PropTypes.string,
  name: PropTypes.string.isRequired,
  onDeleteActivity: PropTypes.func,
  onSave: PropTypes.func,
  updateDate: PropTypes.string,
};
