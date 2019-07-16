import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox, Button } from 'semantic-ui-react';

import { PlateMapDropdown } from './PlateMapDropdown';
import styles from './PlateMapToolbar.module.css';

export class PlateMapToolbar extends Component {
  handleDelete = () => {
    this.props.onDeleteClick(this.props.activePlateMap.id);
  };
  handleHighlight = (e, { value }) => {
    this.props.onHighlightClick({ componentType: value });
  };
  render() {
    const { plateMaps, activePlateMap, highlightedComponents } = this.props;
    return (
      <div className={styles.toolbar}>
        <div>
          <PlateMapDropdown
            plateMaps={plateMaps}
            activePlateMap={activePlateMap}
            onChange={this.props.onPlateMapChange}
          />
        </div>
        <div>
          <Button
            primary
            icon="plus circle"
            content="Add Plate Map"
            onClick={this.props.onAddClick}
          />
          <Button
            icon="trash"
            content="Delete Plate Map"
            onClick={this.handleDelete}
          />
        </div>
        <div className={styles.highlight}>
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
        </div>
      </div>
    );
  }
}

PlateMapToolbar.propTypes = {
  plateMaps: PropTypes.array.isRequired,
  activePlateMap: PropTypes.object.isRequired,
  highlightedComponents: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onHighlightClick: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired,
};
