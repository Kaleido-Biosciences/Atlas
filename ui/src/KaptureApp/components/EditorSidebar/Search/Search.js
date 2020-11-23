import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Search as SemanticUISearch } from 'semantic-ui-react';

export class Search extends Component {
  handleChange = (e, { value }) => {
    if (this.props.onSearchChange) {
      this.props.onSearchChange(value);
    }
  };
  render() {
    const { loading, placeholder, value } = this.props;
    return (
      <SemanticUISearch
        fluid
        input={{ fluid: true }}
        loading={loading}
        onSearchChange={this.handleChange}
        placeholder={placeholder}
        showNoResults={false}
        value={value}
      />
    );
  }
}

Search.propTypes = {
  loading: PropTypes.bool,
  onSearchChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};
