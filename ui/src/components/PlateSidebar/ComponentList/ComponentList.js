import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Header } from './Header';
import { List } from './List';

class ComponentList extends Component {
  render() {
    const { componentList, componentCounts } = this.props;
    return (
      <div>
        <Header />
        <List components={componentList} counts={componentCounts} />
      </div>
    );
  }
}

ComponentList.propTypes = {
  componentList: PropTypes.array,
};

const mapState = (state, props) => {
  const { componentList, componentCounts } = state.designExperiment;
  return { componentList, componentCounts };
};

const mapDispatch = {};

const connected = connect(
  mapState,
  mapDispatch
)(ComponentList);
export { connected as ComponentList };
