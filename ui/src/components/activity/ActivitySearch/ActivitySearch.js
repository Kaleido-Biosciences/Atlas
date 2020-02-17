import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Search } from 'semantic-ui-react';

import styles from './ActivitySearch.module.css';

export class ActivitySearch extends Component {
  componentWillUnmount() {
    if (this.props.onUnmount) {
      this.props.onUnmount();
    }
  }
  handleSearchChange = (e, { value }) => {
    if (this.props.onChange) {
      this.props.onChange({ searchTerm: value });
    }
  };
  handleResultSelect = (e, { result }) => {
    if (this.props.onSelect) {
      this.props.onSelect({ activity: result.data });
    }
  };
  render() {
    const {
      value,
      loading,
      error,
      results,
      placeholder,
      autoFocus,
    } = this.props;
    let showNoResults = false,
      noResultsMessage = '';
    if (error) {
      showNoResults = true;
      noResultsMessage = `Error occurred while searching: ${error}`;
    } else if (results && !loading) {
      showNoResults = true;
      noResultsMessage = 'No activities found';
    }
    return (
      <Search
        className={styles.search}
        fluid
        input={{ fluid: true }}
        loading={loading}
        results={results}
        showNoResults={showNoResults}
        noResultsMessage={noResultsMessage}
        placeholder={placeholder}
        value={value}
        autoFocus={autoFocus}
        onSearchChange={this.handleSearchChange}
        onResultSelect={this.handleResultSelect}
      />
    );
  }
}

ActivitySearch.propTypes = {
  value: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  results: PropTypes.array,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  onUnmount: PropTypes.func,
};

ActivitySearch.defaultProps = {
  value: '',
  placeholder: 'Search activities',
  autoFocus: false,
};
