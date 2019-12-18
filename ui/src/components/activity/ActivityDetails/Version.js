import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import moment from 'moment';

import { STATUS_COMPLETED } from '../../../constants';

const ldapToJS = n => {
  return new Date(n / 1e4 - 1.16444736e13);
};

export class Version extends Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick({
        version: this.props.version,
      });
    }
  };
  render() {
    const { version } = this.props;
    const status = version.experiment_status.split('_')[1];
    const plateCount = version.plateMaps.length;
    let displayTime = '-';
    if (status === STATUS_COMPLETED) {
      const jsTime = ldapToJS(version.version);
      const saveTime = moment(jsTime);
      displayTime = saveTime.format('MMMM Do YYYY, h:mm a');
    }
    return (
      <Card link onClick={this.handleClick}>
        <Card.Content>
          <Card.Header>{status}</Card.Header>
          <Card.Meta>
            <span>{displayTime}</span>
          </Card.Meta>
          <Card.Description>{plateCount} plates</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

Version.propTypes = {
  version: PropTypes.object,
  onClick: PropTypes.func,
};
