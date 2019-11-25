import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Search } from 'semantic-ui-react';
import _ from 'lodash';

import { api } from '../../../api';

export class ExperimentSearch extends Component {
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
        const response = await api.kapture.fetchExperiments(0, 5, value);
        const results = response.data.map(exp => {
          return { title: exp.name, description: exp.description, data: exp };
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
      this.props.onSelect({ experiment: result.data });
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
        placeholder="Search experiments"
        value={value}
        autoFocus={autoFocus}
      />
    );
  }
}

ExperimentSearch.propTypes = {
  defaultValue: PropTypes.string,
  autoFocus: PropTypes.bool,
  onSelect: PropTypes.func,
};
