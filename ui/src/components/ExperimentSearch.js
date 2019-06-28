import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Search } from 'semantic-ui-react';
import _ from 'lodash';

import { fetchExperiments } from '../api';

export class ExperimentSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      results: null,
      showNoResults: false,
      noResultsMessage: 'No results found.',
    };
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ loading: true, results: [], showNoResults: false });
    fetchExperiments(0, 5, value)
      .then(response => {
        const results = response.data.map(exp => {
          return { title: exp.name, description: exp.description, data: exp };
        });
        this.setState({
          loading: false,
          results,
          showNoResults: true,
          noResultsMessage: 'No results found.',
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          showNoResults: true,
          noResultsMessage: 'Error occurred while searching.',
        });
      });
  };

  handleResultSelect = (e, { result }) => {
    if (this.props.onSelect) {
      this.props.onSelect(result.data);
    }
  };

  render() {
    const { loading, results, showNoResults, noResultsMessage } = this.state;
    return (
      <Search
        fluid
        input={{ fluid: true }}
        loading={loading}
        results={results}
        onSearchChange={_.debounce(this.handleSearchChange, 500)}
        onResultSelect={this.handleResultSelect}
        showNoResults={showNoResults}
        noResultsMessage={noResultsMessage}
        placeholder="Search experiments"
      />
    );
  }
}

ExperimentSearch.propTypes = {
  onSelect: PropTypes.func,
};
