import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'semantic-ui-react';

import styles from './ContainerCollection.module.css';

export class ContainerCollection extends Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick({
        route: this.props.route,
      });
    }
  };
  render() {
    const { tooltip, name, icon, metadata, containerCount } = this.props;
    return (
      <Card link onClick={this.handleClick} title={tooltip}>
        <Card.Content>
          <Card.Header className={styles.header}>
            {name}
            <Icon name={icon} />
          </Card.Header>
          <Card.Meta>
            <span>{metadata}</span>
          </Card.Meta>
          <Card.Description>{containerCount} containers</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

ContainerCollection.propTypes = {
  tooltip: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.string,
  metadata: PropTypes.string,
  containerCount: PropTypes.number,
  route: PropTypes.string,
  onClick: PropTypes.func,
};
