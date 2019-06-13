import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox, Button } from 'semantic-ui-react';

export class PlateMapToolbar extends Component {
  handleDelete = () => {
    this.props.onDeleteClick(this.props.activePlateMap.id);
  };
  handleHighlight = (e, { value }) => {
    this.props.onHighlightClick({ componentType: value });
  };
  render() {
    const { highlightedComponents } = this.props;
    return (
      <div className="platemap-toolbar">
        <div className="highlight">
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
        <div className="actions">
          <Button
            compact
            icon="trash"
            content="Delete"
            onClick={this.handleDelete}
          />
        </div>
      </div>
    );
  }
}

PlateMapToolbar.propTypes = {
  activePlateMap: PropTypes.object.isRequired,
  highlightedComponents: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onHighlightClick: PropTypes.func.isRequired,
};
