import React from 'react';
import PropTypes from 'prop-types';
import { Search } from 'ui';
import { Button } from 'KaptureApp/components/ui/Button';
import { ComponentList } from '../ComponentList';
import styles from './ApplyTool.module.css';

export class ComponentSearch extends React.Component {
  handleSearchChange = (e, value) => {
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
        <div className="flex flex-row items-center px-3 py-1">
          <div className={`${styles.search} mr-2 text-xs`}>
            <Search
              loading={searchPending}
              placeholder="Search components"
              onChange={this.handleSearchChange}
              value={searchTerm}
            />
          </div>
          <div className={styles.cancelContainer}>
            <Button onClick={onClose} secondary>
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
