import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Search } from 'semantic-ui-react';
import _ from 'lodash';

import { api } from '../../../api';

export class ActivitySearch extends Component {
  state = {
    value: this.props.defaultValue || '',
    loading: false,
    results: null,
    showNoResults: false,
    noResultsMessage: 'No results found.',
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ value });
    this.loadResults(value);
  };

  loadResults = _.debounce(async value => {
    if (value) {
      try {
        this.setState({ loading: true, showNoResults: false });
        const response = await api.kapture.searchActivities(0, 5, value);
        const results = response.data.map(activity => {
          return { title: activity.name, description: activity.description, data: activity };
        });
        this.setState({
          loading: false,
          results,
          showNoResults: true,
          noResultsMessage: 'No results found.',
        });
      } catch (err) {
        this.setState({
          loading: false,
          showNoResults: true,
          noResultsMessage: 'Error occurred while searching.',
        });
      }
    } else {
      this.setState({
        results: null,
        showNoResults: false,
      });
    }
  }, 500);

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.data.name });
    if (this.props.onSelect) {
      this.props.onSelect({ activity: result.data });
    }
  };

  render() {
    const {
      loading,
      results,
      showNoResults,
      noResultsMessage,
      value,
    } = this.state;
    const { autoFocus } = this.props;
    return (
      <Search
        fluid
        input={{ fluid: true }}
        loading={loading}
        results={results}
        onSearchChange={this.handleSearchChange}
        onResultSelect={this.handleResultSelect}
        showNoResults={showNoResults}
        noResultsMessage={noResultsMessage}
        placeholder="Search activities"
        value={value}
        autoFocus={autoFocus}
      />
    );
  }
}

ActivitySearch.propTypes = {
  defaultValue: PropTypes.string,
  autoFocus: PropTypes.bool,
  onSelect: PropTypes.func,
};
