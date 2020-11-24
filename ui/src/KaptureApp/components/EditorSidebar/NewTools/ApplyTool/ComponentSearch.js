import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import { ComponentList } from 'KaptureApp/components/EditorSidebar/ComponentList';
import { Search } from 'KaptureApp/components/EditorSidebar/Search';
import styles from './ApplyTool.module.css';

export class ComponentSearch extends React.Component {
  handleSearchChange = (value) => {
    if (this.props.onSearchChange) this.props.onSearchChange(value);
  };
  render() {
    const {
      searchComplete,
      searchPending,
      searchResults,
      searchTerm,
      onClose,
      onComponentClick,
    } = this.props;
    return (
      <div className={styles.componentSearch}>
        <div className={styles.searchContainer}>
          <div className={styles.search}>
            <Search
              value={searchTerm}
              loading={searchPending}
              placeholder="Search components"
              onSearchChange={this.handleSearchChange}
            />
          </div>
          <div className={styles.cancelContainer}>
            <Button onClick={onClose} size="mini">
              Cancel
            </Button>
          </div>
        </div>
        <div className={styles.componentList}>
          {searchTerm && searchComplete && (
            <ComponentList
              components={searchResults}
              onComponentClick={onComponentClick}
            />
          )}
        </div>
      </div>
    );
  }
}

ComponentSearch.propTypes = {
  searchComplete: PropTypes.bool,
  searchPending: PropTypes.bool,
  searchResults: PropTypes.array,
  searchTerm: PropTypes.string,
  onClose: PropTypes.func,
  onComponentClick: PropTypes.func,
  onSearchChange: PropTypes.func,
};
