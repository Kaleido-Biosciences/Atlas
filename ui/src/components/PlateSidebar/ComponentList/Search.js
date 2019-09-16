import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Search as SemanticUISearch } from 'semantic-ui-react';

export class Search extends Component {
  handleChange = (e, { value }) => {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };
  render() {
    const { value, loading } = this.props;
    return (
      <SemanticUISearch
        fluid
        input={{ fluid: true }}
        loading={loading}
        onSearchChange={this.handleChange}
        showNoResults={false}
        placeholder="Search components"
        value={value}
      />
    );
  }
}

Search.propTypes = {
  value: PropTypes.string,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
};
