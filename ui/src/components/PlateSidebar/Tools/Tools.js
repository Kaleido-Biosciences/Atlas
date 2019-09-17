import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Icon } from 'semantic-ui-react';

import {
  setClickMode,
  deselectAllWells,
} from '../../../store/experimentActions';
import { selectActivePlate } from '../../../store/selectors';
import { Header } from './Header';
import styles from './Tools.module.css';

class Tools extends Component {
  handleToolClick = (e, { name }) => {
    this.props.setClickMode(name);
    this.props.deselectAllWells({ plateId: this.props.activePlate.id });
  };
  render() {
    const { clickMode } = this.props;
    return (
      <div>
        <Header />
        <Menu size="mini" className={styles.menu}>
          <Menu.Item
            name="apply"
            onClick={this.handleToolClick}
            active={clickMode === 'apply'}
          >
            <Icon name="paint brush" title="Apply tool" />
          </Menu.Item>

          <Menu.Item
            name="select"
            onClick={this.handleToolClick}
            active={clickMode === 'select'}
          >
            <Icon name="expand" title="Select tool" />
          </Menu.Item>

          <Menu.Item
            name="clear"
            onClick={this.handleToolClick}
            active={clickMode === 'clear'}
          >
            <Icon name="eraser" title="Clear tool" />
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

Tools.propTypes = {
  activePlate: PropTypes.object,
  clickMode: PropTypes.string.isRequired,
  setClickMode: PropTypes.func.isRequired,
  deselectAllWells: PropTypes.func.isRequired,
};

const mapState = (state, props) => {
  const activePlate = selectActivePlate(state);
  const { clickMode } = state.designExperiment;
  return { activePlate, clickMode };
};

const mapDispatch = {
  setClickMode,
  deselectAllWells,
};

const connected = connect(
  mapState,
  mapDispatch
)(Tools);
export { connected as Tools };
