import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

import { ContainerCollection } from '../ContainerCollection';
import styles from './ActivityDetails.module.css';

export class ActivityDetails extends Component {
  componentWillUnmount() {
    if (this.props.onUnmount) {
      this.props.onUnmount();
    }
  }
  handleCollectionClick = ({ route }) => {
    let url = this.props.match.url;
    url = url.endsWith('/') ? url.slice(0, -1) : url;
    this.props.history.push(url + route);
  };
  renderCollections(collections) {
    return (
      <Card.Group>
        {collections.map((collection) => {
          const key = collection.id;
          return (
            <ContainerCollection
              key={key}
              tooltip={collection.tooltip}
              name={collection.name}
              metadata={collection.formattedUpdatedTime}
              containerCount={collection.containerCount}
              route={collection.route}
              onClick={this.handleCollectionClick}
            />
          );
        })}
      </Card.Group>
    );
  }
  render() {
    const { containerCollections: collections } = this.props;
    let content = null;
    if (collections.length) {
      content = this.renderCollections(collections);
    }
    return <div className={styles.experimentDetails}>{content}</div>;
  }
}

ActivityDetails.propTypes = {
  activityName: PropTypes.string,
  containerCollections: PropTypes.array,
  onUnmount: PropTypes.func,
};
