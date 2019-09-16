import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addKaptureComponentsToComponentsList } from '../../store/experimentActions';
import { ComponentSearch } from './ComponentSearch';
import { ComponentSearchResults } from './ComponentSearchResults';
import styles from './SearchComponents.module.css';

class SearchComponents extends Component {
  state = {
    searchResult: null,
  };
  handleResultsLoaded = ({ searchResult }) => {
    this.setState({ searchResult });
  };
  handleResultClick = ({ kaptureComponent }) => {
    const kaptureComponents = {
      communities: [],
      compounds: [],
      media: [],
      supplements: [],
    };
    const keys = {
      community: 'communities',
      compound: 'compounds',
      medium: 'media',
      supplement: 'supplements',
    };
    kaptureComponents[keys[kaptureComponent.type]].push(kaptureComponent.data);
    this.props.onAdd({ kaptureComponents });
  };
  render() {
    const { searchResult } = this.state;
    return (
      <div className={styles.searchComponents}>
        <ComponentSearch onSearchComplete={this.handleResultsLoaded} />
        <ComponentSearchResults
          searchResult={searchResult}
          onResultClick={this.handleResultClick}
        />
      </div>
    );
  }
}

const mapDispatch = {
  onAdd: addKaptureComponentsToComponentsList,
};

const connected = connect(
  null,
  mapDispatch
)(SearchComponents);
export { connected as SearchComponents };
