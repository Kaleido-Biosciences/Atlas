import React, { Component } from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';

import { ComponentSearchResult } from './ComponentSearchResult';
import { COMPONENT_TYPES_PLURAL_TO_SINGULAR } from '../../constants';
import styles from './ComponentSearchResults.module.css';

export class ComponentSearchResults extends Component {
  processSearchResult = memoize(searchResult => {
    if (searchResult) {
      const groupedComponents = searchResult.results;
      const { searchTerm } = searchResult;
      const keys = Object.keys(groupedComponents);
      let finalArray = [];
      keys.forEach(key => {
        const type = COMPONENT_TYPES_PLURAL_TO_SINGULAR[key];
        const kaptureComponents = groupedComponents[key].map(component => ({
          type,
          data: component,
        }));
        finalArray = finalArray.concat(kaptureComponents);
      });
      finalArray.sort((a, b) => {
        const aNameContainsTerm = a.data.name.includes(searchTerm);
        const bNameContainsTerm = b.data.name.includes(searchTerm);
        let value;
        if (aNameContainsTerm && bNameContainsTerm) {
          value = 0;
        } else if (aNameContainsTerm && !bNameContainsTerm) {
          value = -1;
        } else if (!aNameContainsTerm && bNameContainsTerm) {
          value = 1;
        }
        return value;
      });
      return finalArray;
    } else return null;
  });
  handleResultClick = kaptureComponent => {
    if (this.props.onResultClick) {
      this.props.onResultClick(kaptureComponent);
    }
  };
  render() {
    const { searchResult } = this.props;
    const results = this.processSearchResult(searchResult);
    if (!results) {
      return <div />;
    } else {
      return (
        <div className={styles.componentSearchResults}>
          {results.map(component => {
            return (
              <ComponentSearchResult
                key={component.data.id}
                component={component}
                onClick={this.handleResultClick}
              />
            );
          })}
        </div>
      );
    }
  }
}

ComponentSearchResults.propTypes = {
  searchresult: PropTypes.array,
  onResultClick: PropTypes.func,
};
