import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import memoize from 'memoize-one';

import { api } from '../../../api';
import { Header } from './Header';
import { Search } from './Search';
import { List } from './List';
import styles from './ComponentList.module.css';

export class ComponentList extends Component {
  state = {
    value: '',
    loading: false,
    searchComponents: [],
    updateComplete: false,
  };
  debouncedLoadResults = _.debounce((value) => {
    this.loadResults(value);
  }, 500);
  getComponentsList = memoize((localComponents, searchComponents, query) => {
    let finalArray = [];
    let value = query.toUpperCase();
    if (query) {
      const filtered = localComponents.filter((component) => {
        return component.name.toUpperCase().includes(value);
      });
      const filteredIds = filtered.map((component) => {
        return component.id;
      });
      finalArray = finalArray.concat(filtered);
      if (searchComponents) {
        const filteredSearchComponents = searchComponents.filter(
          (searchComponent) => {
            return !filteredIds.includes(searchComponent.id);
          }
        );
        finalArray = finalArray.concat(filteredSearchComponents);
      }
    } else {
      finalArray = finalArray.concat(localComponents);
    }
    return finalArray;
  });
  handleSearchChange = (value) => {
    this.setState({ value, searchComponents: [], updateComplete: false });
    this.debouncedLoadResults(value);
  };
  loadResults = async (searchQuery) => {
    if (searchQuery) {
      try {
        this.setState({ loading: true });
        const results = await api.searchComponents(0, 4, searchQuery);
        const searchUpper = searchQuery.toUpperCase();
        results.sort((a, b) => {
          const aName = a.data.name.toUpperCase();
          const bName = b.data.name.toUpperCase();
          const aNameContainsTerm = aName.includes(searchUpper);
          const bNameContainsTerm = bName.includes(searchUpper);
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
        this.setState({
          loading: false,
          searchComponents: results,
          updateComplete: true,
        });
      } catch (err) {
        this.setState({
          loading: false,
        });
      }
    }
  };
  handleComponentListClick = ({ component }) => {
    this.setState({ value: '', searchComponents: [] });
    if (this.props.onComponentClick) {
      this.props.onComponentClick({ component });
    }
  };
  renderList() {
    const { components, componentCounts } = this.props;
    const { value, searchComponents, updateComplete } = this.state;
    const filteredComponents = this.getComponentsList(
      components,
      searchComponents,
      value
    );
    if (filteredComponents.length) {
      return (
        <List
          components={filteredComponents}
          counts={componentCounts}
          onComponentClick={this.handleComponentListClick}
        />
      );
    } else {
      if (value && updateComplete) {
        return (
          <div className={styles.noComponentsMessage}>
            No matching components found.
          </div>
        );
      } else if (!value) {
        return (
          <div className={styles.noComponentsMessage}>
            Get started by adding some components.
          </div>
        );
      }
    }
  }
  render() {
    const { value, loading } = this.state;
    return (
      <div className={styles.componentList}>
        <Header />
        <div className={styles.search}>
          <Search
            value={value}
            loading={loading}
            onChange={this.handleSearchChange}
          />
        </div>
        {this.renderList()}
      </div>
    );
  }
}

ComponentList.propTypes = {
  components: PropTypes.array,
  onComponentClick: PropTypes.func,
};
