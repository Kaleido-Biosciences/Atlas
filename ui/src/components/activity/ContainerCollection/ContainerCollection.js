import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'semantic-ui-react';

import styles from './ContainerCollection.module.css';

export class ContainerCollection extends Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick({
        collection: this.props.collection,
      });
    }
  };
  render() {
    const { collection } = this.props;
    const {
      tooltip,
      displayName,
      icon,
      formattedUpdatedTime,
      containerCount,
    } = collection;
    return (
      <Card link onClick={this.handleClick} title={tooltip}>
        <Card.Content>
          <Card.Header className={styles.header}>
            {displayName}
            <Icon name={icon} />
          </Card.Header>
          <Card.Meta>
            <span>{formattedUpdatedTime}</span>
          </Card.Meta>
          <Card.Description>{containerCount} containers</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

ContainerCollection.propTypes = {
  collection: PropTypes.object,
  onClick: PropTypes.func,
};
