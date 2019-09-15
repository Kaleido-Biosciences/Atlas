import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addComponentToToolComponents } from '../../../store/experimentActions';
import { Header } from './Header';
import { List } from './List';

class ComponentList extends Component {
  render() {
    const { components, componentCounts, onComponentClick } = this.props;
    return (
      <div>
        <Header />
        <List
          components={components}
          counts={componentCounts}
          onComponentClick={onComponentClick}
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
  onComponentClick: addComponentToToolComponents,
};

const connected = connect(
  mapState,
  mapDispatch
)(ComponentList);
export { connected as ComponentList };
