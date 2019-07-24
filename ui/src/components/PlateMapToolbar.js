import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Popup } from 'semantic-ui-react';

import {
  createExperimentActions,
  addNewPlateMap,
  clonePlateMap,
  selectActivePlateMap,
} from '../store/createExperiment';
import { PlateMapDropdown } from './PlateMapDropdown';
import styles from './PlateMapToolbar.module.css';
import { ClonePlateForm } from './ClonePlateForm';

class PlateMapToolbar extends Component {
  state = {
    clonePopupOpen: false,
  };
  handleAddClick = () => {
    if (this.props.onAddClick) {
      this.props.onAddClick();
    }
  };
  handleDeleteClick = () => {
    if (this.props.onDeleteClick) {
      this.props.onDeleteClick(this.props.activePlateMap.id);
    }
  };
  handleHighlight = (e, { value }) => {
    if (this.props.onHighlightClick) {
      this.props.onHighlightClick({ componentType: value });
    }
  };
  handleCloneSubmit = ({ typesToClone }) => {
    if (this.props.onCloneSubmit) {
      this.props.onCloneSubmit(this.props.activePlateMap.id, typesToClone);
    }
    this.handleClonePopupClose();
  };
  handleClonePopupOpen = () => {
    this.setState({ clonePopupOpen: true });
  };
  handleClonePopupClose = () => {
    this.setState({ clonePopupOpen: false });
  };
  render() {
    const { plateMaps, activePlateMap } = this.props;
    return (
      <div className={styles.toolbar}>
        <div className={styles.dropdownContainer}>
          <PlateMapDropdown
            plateMaps={plateMaps}
            activePlateMap={activePlateMap}
            onChange={this.props.onPlateMapChange}
          />
        </div>
        <div className={styles.buttonsContainer}>
          <Button
            primary
            icon="plus circle"
            content="Add Plate"
            onClick={this.handleAddClick}
          />
          <Button
            icon="trash"
            content="Delete Plate"
            onClick={this.handleDeleteClick}
          />
          <Popup
            trigger={<Button icon="clone" content="Clone Plate" />}
            on="click"
            open={this.state.clonePopupOpen}
            position="bottom left"
            onClose={this.handleClonePopupClose}
            onOpen={this.handleClonePopupOpen}
          >
            <ClonePlateForm onSubmit={this.handleCloneSubmit} />
          </Popup>
        </div>
        {/* <div className={styles.highlight}>
          <Form>
            <Form.Group inline>
              <label>Highlight wells containing:</label>
              <Form.Field>
                <Checkbox
                  label="Communities"
                  value="communities"
                  onClick={this.handleHighlight}
                  checked={highlightedComponents.includes('communities')}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label="Compounds"
                  value="compounds"
                  onClick={this.handleHighlight}
                  checked={highlightedComponents.includes('compounds')}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label="Media"
                  value="media"
                  onClick={this.handleHighlight}
                  checked={highlightedComponents.includes('media')}
                />
              </Form.Field>
            </Form.Group>
          </Form>
        </div> */}
      </div>
    );
  }
}

PlateMapToolbar.propTypes = {
  plateMaps: PropTypes.array.isRequired,
  activePlateMap: PropTypes.object.isRequired,
  highlightedComponents: PropTypes.array.isRequired,
  onPlateMapChange: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onHighlightClick: PropTypes.func,
  onAddClick: PropTypes.func,
  onCloneSubmit: PropTypes.func,
};

const mapState = (state, props) => {
  const { plateMaps, highlightedComponents } = state.createExperiment;
  const activePlateMap = selectActivePlateMap(state);
  return { plateMaps, highlightedComponents, activePlateMap };
};

const mapDispatch = {
  onPlateMapChange: createExperimentActions.setActivePlateMap,
  onDeleteClick: createExperimentActions.deletePlateMap,
  onHighlightClick: createExperimentActions.toggleHighlight,
  onAddClick: addNewPlateMap,
  onCloneSubmit: clonePlateMap,
};

const connected = connect(
  mapState,
  mapDispatch
)(PlateMapToolbar);
export { connected as PlateMapToolbar };
