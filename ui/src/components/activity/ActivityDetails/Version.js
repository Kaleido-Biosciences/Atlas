import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'semantic-ui-react';
import moment from 'moment';
import bigInt from 'big-integer';

import { STATUS_COMPLETED } from '../../../constants';
import styles from './Version.module.css';

const ldapToJS = n => {
  return new Date(Number(bigInt(n) / bigInt(1e4) - bigInt(1.16444736e13)));
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
    let displayTime = '-',
      icon = 'edit',
      title = 'View in editor';
    if (status === STATUS_COMPLETED) {
      const jsTime = ldapToJS(version.version);
      const saveTime = moment(jsTime);
      displayTime = saveTime.format('MMMM Do YYYY, h:mm a');
      icon = 'print';
      title = 'Print plates';
    }
    return (
      <Card link onClick={this.handleClick} title={title}>
        <Card.Content>
          <Card.Header className={styles.header}>
            {status}
            <Icon name={icon} />
          </Card.Header>
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
