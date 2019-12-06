import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Icon } from 'semantic-ui-react';

import {
  setClickMode,
  deselectAllWells,
} from '../../../../store/designActions';
import { selectActivePlate } from '../../../../store/selectors';
import { Header } from './Header';
import { ApplyTool } from './ApplyTool';
import { ClearTool } from './ClearTool';
import styles from './Tools.module.css';

class Tools extends Component {
  handleToolClick = (e, { name }) => {
    this.props.setClickMode(name);
    this.props.deselectAllWells({ plateId: this.props.activePlate.id });
  };
  renderTool() {
    const { clickMode } = this.props;
    if (clickMode === 'apply' || clickMode === 'select') {
      return <ApplyTool />;
    } else if (clickMode === 'clear') {
      return <ClearTool />;
    }
  }
  render() {
    const { clickMode } = this.props;
    return (
      <div className={styles.tools}>
        <Header />
        <Menu size="mini" className={styles.menu}>
          <Menu.Item
            name="apply"
            onClick={this.handleToolClick}
            active={clickMode === 'apply'}
            title="Apply tool"
          >
            <Icon name="paint brush" />
          </Menu.Item>

          <Menu.Item
            name="select"
            onClick={this.handleToolClick}
            active={clickMode === 'select'}
            title="Select tool"
          >
            <Icon name="expand" />
          </Menu.Item>

          <Menu.Item
            name="clear"
            onClick={this.handleToolClick}
            active={clickMode === 'clear'}
            title="Clear tool"
          >
            <Icon name="eraser" />
          </Menu.Item>
        </Menu>
        {this.renderTool()}
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
