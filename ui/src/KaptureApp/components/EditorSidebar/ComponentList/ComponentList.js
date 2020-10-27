import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Header } from './Header';
import { Search } from './Search';
import { List } from './List';
import styles from './ComponentList.module.css';

export class ComponentList extends Component {
  handleSearchChange = (value) => {
    if (this.props.onSearchChange) {
      this.props.onSearchChange(value);
    }
  };
  handleComponentClick = (component) => {
    if (this.props.onComponentClick) {
      this.props.onComponentClick(component);
    }
  };
  renderList() {
    const {
      filteredComponents,
      searchTerm,
      searchComplete,
      searchError,
    } = this.props;
    if (filteredComponents.length) {
      return (
        <List
          components={filteredComponents}
          onComponentClick={this.handleComponentClick}
        />
      );
    } else {
      if (searchTerm && searchComplete) {
        return (
          <div className={styles.noComponentsMessage}>
            No matching components found.
          </div>
        );
      } else if (searchError) {
        return <div className={styles.errorMessage}>{searchError}</div>;
      } else if (!searchTerm) {
        return (
          <div className={styles.noComponentsMessage}>
            Get started by adding some components.
          </div>
        );
      }
    }
  }
  render() {
    const { searchTerm, searchPending, onImportModalClose } = this.props;
    return (
      <div className={styles.componentList}>
        <Header onImportModalClose={onImportModalClose} />
        <div className={styles.search}>
          <Search
            value={searchTerm}
            loading={searchPending}
            onChange={this.handleSearchChange}
          />
        </div>
        {this.renderList()}
      </div>
    );
  }
}

ComponentList.propTypes = {
  filteredComponents: PropTypes.array,
  searchTerm: PropTypes.string,
  searchPending: PropTypes.bool,
  searchComplete: PropTypes.bool,
  searchError: PropTypes.string,
  onSearchChange: PropTypes.func,
  onComponentClick: PropTypes.func,
  onImportModalClose: PropTypes.func,
};
