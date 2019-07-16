import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Search } from 'semantic-ui-react';
import _ from 'lodash';

import { fetchExperiments } from '../api';

export class ExperimentSearch extends Component {
  constructor(props) {
    super(props);
    const { defaultValue } = props;
    this.state = {
      value: defaultValue || '',
      loading: false,
      results: null,
      showNoResults: false,
      noResultsMessage: 'No results found.',
    };
    this.debouncedLoadResults = _.debounce(value => {
      this.loadResults(value);
    }, 500);
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ value });
    this.debouncedLoadResults(value);
  };

  loadResults = async value => {
    if (value) {
      try {
        this.setState({ loading: true, showNoResults: false });
        const response = await fetchExperiments(0, 5, value);
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
  };

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.data.name });
    if (this.props.onSelect) {
      this.props.onSelect(result.data);
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
      />
    );
  }
}

ExperimentSearch.propTypes = {
  defaultValue: PropTypes.string,
  onSelect: PropTypes.func,
};
