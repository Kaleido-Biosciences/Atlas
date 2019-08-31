import React, { Component } from 'react';
import { connect } from 'react-redux';

import { api } from '../../api';
import { addKaptureComponentsToComponentsList } from '../../store/experimentActions';
import { ImportTextArea } from './ImportTextArea';
import { ImportResults } from './ImportResults';

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
      const components = this.state.found.map(({ type, data }) => {
        return { type, data };
      });
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
      components.forEach(({ type, data }) => {
        kaptureComponents[keys[type]].push(data);
      });
      this.props.onAdd({ kaptureComponents });
    }
  };

  render() {
    const { view, found, notFound, total, completed } = this.state;
    return (
      <div>
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

const mapDispatch = {
  onAdd: addKaptureComponentsToComponentsList,
};

const connected = connect(
  null,
  mapDispatch
)(ImportComponents);
export { connected as ImportComponents };
