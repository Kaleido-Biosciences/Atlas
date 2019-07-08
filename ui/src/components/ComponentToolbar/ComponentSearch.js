import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Search } from 'semantic-ui-react';
import _ from 'lodash';

import { fetchComponents } from '../../api';

export class ComponentSearch extends Component {
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
        const responses = await fetchComponents(0, 2, value);
        const results = {};
        results.communities = {
          name: 'Communities',
          results: responses.communities.map(comm => {
            return {
              title: comm.name,
              data: comm,
              type: 'community',
            };
          }),
        };
        results.compounds = {
          name: 'Compounds',
          results: responses.compounds.map(comp => {
            return {
              title: comp.name,
              data: comp,
              type: 'compound',
            };
          }),
        };
        results.media = {
          name: 'Media',
          results: responses.media.map(medium => {
            return {
              title: medium.name,
              data: medium,
              type: 'medium',
            };
          }),
        };
        results.supplements = {
          name: 'Supplements',
          results: responses.supplements.map(supp => {
            return {
              title: supp.name.label,
              data: supp,
              type: 'supplement',
            };
          }),
        };
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
    this.setState({ value: '', results: [], showNoResults: false });
    if (this.props.onSelect) {
      this.props.onSelect({
        type: result.type,
        component: result.data,
      });
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
        category
        fluid
        input={{ fluid: true }}
        loading={loading}
        results={results}
        onSearchChange={this.handleSearchChange}
        onResultSelect={this.handleResultSelect}
        showNoResults={showNoResults}
        noResultsMessage={noResultsMessage}
        placeholder="Search components"
        value={value}
      />
    );
  }
}

ComponentSearch.propTypes = {
  defaultValue: PropTypes.string,
  onSelect: PropTypes.func,
};
