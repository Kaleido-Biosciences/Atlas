import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Header } from './Header';
import { ComponentList } from 'KaptureApp/components/EditorSidebar/ComponentList';
import { Search } from 'KaptureApp/components/EditorSidebar/Search';
import styles from './Components.module.css';

export class Components extends Component {
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
  renderComponentList() {
    const {
      filteredComponents,
      searchTerm,
      searchComplete,
      searchError,
    } = this.props;
    if (filteredComponents.length) {
      return (
        <div className={styles.componentList}>
          <ComponentList
            components={filteredComponents}
            onComponentClick={this.handleComponentClick}
          />
        </div>
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
      <div className={styles.components}>
        <Header onImportModalClose={onImportModalClose} />
        <div className={styles.search}>
          <Search
            loading={searchPending}
            onSearchChange={this.handleSearchChange}
            placeholder="Search components"
            value={searchTerm}
          />
        </div>
        {this.renderComponentList()}
      </div>
    );
  }
}

Components.propTypes = {
  filteredComponents: PropTypes.array,
  searchTerm: PropTypes.string,
  searchPending: PropTypes.bool,
  searchComplete: PropTypes.bool,
  searchError: PropTypes.string,
  onSearchChange: PropTypes.func,
  onComponentClick: PropTypes.func,
  onImportModalClose: PropTypes.func,
};
