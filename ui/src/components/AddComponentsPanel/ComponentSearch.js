import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Search } from 'semantic-ui-react';
import _ from 'lodash';

import { api } from '../../api';

export class ComponentSearch extends Component {
  state = {
    value: '',
    loading: false,
  };

  debouncedLoadResults = _.debounce(value => {
    this.loadResults(value);
  }, 500);

  handleSearchChange = (e, { value }) => {
    this.setState({ value });
    this.debouncedLoadResults(value);
  };

  loadResults = async value => {
    if (value) {
      try {
        this.setState({ loading: true });
        const results = await api.kapture.searchComponents(0, 4, value);
        this.setState({
          loading: false,
        });
        this.onSearchComplete(value, results);
      } catch (err) {
        this.setState({
          loading: false,
        });
        this.onSearchComplete(value, null, ['Error occurred while searching.']);
      }
    }
  };

  onSearchComplete(searchTerm, results = [], errors = []) {
    if (this.props.onSearchComplete) {
      this.props.onSearchComplete({
        searchResult: {
          searchTerm,
          results,
          errors,
        },
      });
    }
  }

  render() {
    const { value, loading } = this.state;
    return (
      <Search
        fluid
        input={{ fluid: true }}
        loading={loading}
        onSearchChange={this.handleSearchChange}
        showNoResults={false}
        placeholder="Search components"
        value={value}
      />
    );
  }
}

ComponentSearch.propTypes = {
  onSearchComplete: PropTypes.func,
};
