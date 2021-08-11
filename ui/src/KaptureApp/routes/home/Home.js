import React, { Component } from 'react';
import { ActivitySearch } from './ActivitySearch';
import classNames from 'classnames';
import styles from './Home.module.css';

export class Home extends Component {
  handleSelect = (id) => {
    this.props.history.push(`/activities/${id}`);
  };
  render() {
    return (
      <div
        className={classNames(
          styles.home,
          'mx-auto',
          'mt-8',
          'flex',
          'flex-col',
          'items-center'
        )}
      >
        <h1 className="text-3xl mb-3">Atlas</h1>
        <ActivitySearch autoFocus onSelect={this.handleSelect} />
      </div>
    );
  }
}
