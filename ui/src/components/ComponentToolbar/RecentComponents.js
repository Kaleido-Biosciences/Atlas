import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

import { RecentComponent } from './RecentComponent';
import styles from './RecentComponents.module.css';

export class RecentComponents extends Component {
  handleClick = ({ component }) => {
    if (this.props.onComponentClick) {
      this.props.onComponentClick({ components: [component] });
    }
  };
  handleRemoveClick = ({ component }) => {
    if (this.props.onComponentRemoveClick) {
      this.props.onComponentRemoveClick({ components: [component] });
    }
  };
  render() {
    const { components } = this.props;
    if (components.length) {
      return (
        <div className={styles.recentComponents}>
          <Header size="tiny" className={styles.header}>
            Recent:
          </Header>
          {components.map((component, i) => {
            return (
              <RecentComponent
                className={styles.component}
                component={component}
                onClick={this.handleClick}
                onRemoveClick={this.handleRemoveClick}
                key={component.id}
              />
            );
          })}
        </div>
      );
    } else return null;
  }
}

RecentComponents.propTypes = {
  components: PropTypes.array,
  onComponentClick: PropTypes.func,
  onComponentRemoveClick: PropTypes.func,
};
