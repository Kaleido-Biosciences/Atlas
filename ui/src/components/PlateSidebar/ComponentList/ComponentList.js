import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addComponentToComponents } from '../../../store/experimentActions';
import { Header } from './Header';
import { List } from './List';

class ComponentList extends Component {
  render() {
    const { componentList, componentCounts, onComponentClick } = this.props;
    return (
      <div>
        <Header />
        <List
          components={componentList}
          counts={componentCounts}
          onComponentClick={onComponentClick}
        />
      </div>
    );
  }
}

ComponentList.propTypes = {
  componentList: PropTypes.array,
  onComponentClick: PropTypes.func,
};

const mapState = (state, props) => {
  const { componentList, componentCounts } = state.designExperiment;
  return { componentList, componentCounts };
};

const mapDispatch = {
  onComponentClick: addComponentToComponents,
};

const connected = connect(
  mapState,
  mapDispatch
)(ComponentList);
export { connected as ComponentList };
