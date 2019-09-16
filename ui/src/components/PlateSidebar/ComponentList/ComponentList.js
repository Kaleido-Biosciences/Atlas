import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import memoize from 'memoize-one';

import {
  addComponentToComponents,
  addComponentToToolComponents,
} from '../../../store/experimentActions';
import { api } from '../../../api';
import { Header } from './Header';
import { Search } from './Search';
import { List } from './List';
import styles from './ComponentList.module.css';

class ComponentList extends Component {
  state = {
    value: '',
    loading: false,
    searchComponents: [],
  };
  debouncedLoadResults = _.debounce(value => {
    this.loadResults(value);
  }, 500);
  getComponentsList = memoize((localComponents, searchComponents, query) => {
    let finalArray = [];
    let value = query.toUpperCase();
    if (query) {
      const filtered = localComponents.filter(component => {
        return component.displayName.toUpperCase().includes(value);
      });
      const filteredIds = filtered.map(component => {
        return component.id;
      });
      finalArray = finalArray.concat(filtered);
      if (searchComponents) {
        const filteredSearchComponents = searchComponents.filter(
          searchComponent => {
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
  handleSearchChange = value => {
    this.setState({ value, searchComponents: [] });
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
        this.setState({ searchComponents: results });
      } catch (err) {
        this.setState({
          loading: false,
        });
      }
    }
  };
  handleComponentListClick = ({ component }) => {
    this.setState({ value: '', searchComponents: [] });
    this.props.addComponentToComponents({ component });
    this.props.addComponentToToolComponents({ component });
  };
  render() {
    const { components, componentCounts } = this.props;
    const { value, loading, searchComponents } = this.state;
    const filteredComponents = this.getComponentsList(
      components,
      searchComponents,
      value
    );
    return (
      <div>
        <Header />
        <div className={styles.search}>
          <Search
            value={value}
            loading={loading}
            onChange={this.handleSearchChange}
          />
        </div>
        <List
          components={filteredComponents}
          counts={componentCounts}
          onComponentClick={this.handleComponentListClick}
        />
      </div>
    );
  }
}

ComponentList.propTypes = {
  components: PropTypes.array,
  onComponentClick: PropTypes.func,
};

const mapState = (state, props) => {
  const { components, componentCounts } = state.designExperiment;
  return { components, componentCounts };
};

const mapDispatch = {
  addComponentToToolComponents,
  addComponentToComponents,
};

const connected = connect(
  mapState,
  mapDispatch
)(ComponentList);
export { connected as ComponentList };
