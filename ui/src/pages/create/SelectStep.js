import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Search } from 'semantic-ui-react';
import _ from 'lodash';

import { fetchExperiments } from '../../api';
import './SelectStep.css';

class SelectStep extends Component {
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
    console.log(result.data);
  };

  render() {
    const { loading, results, showNoResults, noResultsMessage } = this.state;
    return (
      <div className="select-step-container">
        <div className="select-step-centered">
          <Search
            fluid
            input={{ fluid: true }}
            loading={loading}
            results={results}
            onSearchChange={_.debounce(this.handleSearchChange, 500)}
            onResultSelect={this.handleResultSelect}
            showNoResults={showNoResults}
            noResultsMessage={noResultsMessage}
          />
        </div>
      </div>
    );
  }
}

SelectStep.propTypes = {};

const mapState = (state, props) => {
  return state;
};

const mapDispatch = {};

const connected = connect(
  mapState,
  mapDispatch
)(SelectStep);

export { connected as SelectStep };
