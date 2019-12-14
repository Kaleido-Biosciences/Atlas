import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Search } from 'semantic-ui-react';

import {
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
} from '../../../constants';

export class ActivitySearch extends Component {
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
      requestStatus,
      results,
      placeholder,
      autoFocus,
    } = this.props;
    let loading = false,
      showNoResults = false,
      noResultsMessage = '';
    if (requestStatus === REQUEST_PENDING) {
      loading = true;
    } else if (requestStatus === REQUEST_SUCCESS) {
      showNoResults = true;
      noResultsMessage = 'No activities found';
    } else if (requestStatus === REQUEST_ERROR) {
      showNoResults = true;
      noResultsMessage = 'Error occurred while searching.';
    }
    return (
      <Search
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
  results: PropTypes.array,
  requestStatus: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
};

ActivitySearch.defaultProps = {
  value: '',
  placeholder: 'Search activities',
  autoFocus: false,
};
