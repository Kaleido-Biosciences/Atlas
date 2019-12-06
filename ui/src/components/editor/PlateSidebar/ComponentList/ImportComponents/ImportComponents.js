import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { api } from '../../../../../api';
import { addKaptureComponentsToComponents } from '../../../../../store/designActions';
import { ImportTextArea } from './ImportTextArea';
import { ImportResults } from './ImportResults';

import styles from './ImportComponents.module.css';

const INITIAL_STATE = {
  view: 'textarea',
  found: [],
  notFound: [],
  total: null,
  completed: false,
};

class ImportComponents extends Component {
  componentNames = [];
  currentSearchIndex = 0;
  state = INITIAL_STATE;

  searchNext = async () => {
    const index = this.currentSearchIndex;
    const result = await api.kapture.findComponent(this.componentNames[index]);
    if (result.found) {
      this.setState({ found: [result].concat(this.state.found) });
    } else {
      this.setState({ notFound: [result].concat(this.state.notFound) });
    }
    this.currentSearchIndex++;
    if (this.componentNames[this.currentSearchIndex]) {
      this.searchNext();
    } else {
      this.setState({ completed: true });
    }
  };

  handleImport = ({ componentNames }) => {
    this.setState({
      view: 'results',
      total: componentNames.length,
      found: [],
      notFound: [],
      completed: false,
    });
    this.componentNames = componentNames;
    this.currentSearchIndex = 0;
    this.searchNext();
  };

  backToImport = () => {
    this.setState(INITIAL_STATE);
  };

  addComponents = () => {
    if (this.props.onAdd) {
      const kaptureComponents = this.state.found.map(({ type, data }) => {
        return { type, data };
      });
      this.props.onAdd({ kaptureComponents });
      if (this.props.afterAdd) {
        this.props.afterAdd();
      }
    }
  };

  render() {
    const { view, found, notFound, total, completed } = this.state;
    return (
      <div className={styles.importComponents}>
        {view === 'textarea' ? (
          <ImportTextArea onImport={this.handleImport} />
        ) : (
          <ImportResults
            found={found}
            notFound={notFound}
            total={total}
            completed={completed}
            onBack={this.backToImport}
            onAdd={this.addComponents}
          />
        )}
      </div>
    );
  }
}

ImportComponents.propTypes = {
  onAdd: PropTypes.func,
  afterAdd: PropTypes.func,
};

const mapDispatch = {
  onAdd: addKaptureComponentsToComponents,
};

const connected = connect(
  null,
  mapDispatch
)(ImportComponents);
export { connected as ImportComponents };
