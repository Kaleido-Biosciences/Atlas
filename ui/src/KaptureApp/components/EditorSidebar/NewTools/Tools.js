import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';

import { ApplyTool } from './ApplyTool';
import { EraserTool } from './EraserTool';
import styles from './Tools.module.css';

export class Tools extends React.Component {
  handleToolClick = (e, { name }) => {
    if (this.props.onToolButtonClick) {
      this.props.onToolButtonClick(name);
    }
  };
  handleClickModeChange = (e, { value }) => {
    if (this.props.onClickModeChange) {
      this.props.onClickModeChange(value);
    }
  };
  renderTool() {
    const { activeTool } = this.props;
    if (activeTool === 'apply') {
      return <ApplyTool />;
    } else if (activeTool === 'eraser') {
      return <EraserTool />;
    }
  }
  render() {
    const { activeTool } = this.props;
    return (
      <div className={styles.tools}>
        <div className={styles.header}>
          <Button.Group>
            <Button
              name="apply"
              icon="paint brush"
              onClick={this.handleToolClick}
              active={activeTool === 'apply'}
              size="mini"
            />
            <Button
              name="eraser"
              icon="eraser"
              onClick={this.handleToolClick}
              active={activeTool === 'eraser'}
              size="mini"
            />
          </Button.Group>
          <div className={styles.clickMode}>
            <Form>
              <Form.Group inline>
                <label>Click to:</label>
                <Form.Radio
                  label="Apply"
                  value="apply"
                  checked={this.props.clickMode === 'apply'}
                  onChange={this.handleClickModeChange}
                />
                <Form.Radio
                  label="Select"
                  value="select"
                  checked={this.props.clickMode === 'select'}
                  onChange={this.handleClickModeChange}
                />
              </Form.Group>
            </Form>
          </div>
        </div>
        <div className={styles.activeTool}>{this.renderTool()}</div>
      </div>
    );
  }
}

Tools.propTypes = {
  activeTool: PropTypes.string.isRequired,
  clickMode: PropTypes.string,
  onClickModeChange: PropTypes.func,
  onToolButtonClick: PropTypes.func,
};
