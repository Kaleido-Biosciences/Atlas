import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import { ApplyTool } from './ApplyTool';
import { RemoveTool } from './RemoveTool';
import { SelectTool } from './SelectTool';
import styles from './Tools.module.css';

export class Tools extends React.Component {
  handleToolClick = (e, { name }) => {
    if (this.props.onToolButtonClick) {
      this.props.onToolButtonClick(name);
    }
  };
  renderTool() {
    const { activeTool } = this.props;
    if (activeTool === 'apply') {
      return <ApplyTool />;
    } else if (activeTool === 'remove') {
      return <RemoveTool />;
    } else if (activeTool === 'select') {
      return <SelectTool />;
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
              title="Apply Tool"
            />
            <Button
              name="select"
              icon="check square"
              onClick={this.handleToolClick}
              active={activeTool === 'select'}
              size="mini"
              title="Select Tool"
            />
            <Button
              name="remove"
              icon="trash"
              onClick={this.handleToolClick}
              active={activeTool === 'remove'}
              size="mini"
              title="Remove Tool"
            />
          </Button.Group>
        </div>
        <div className={styles.activeTool}>{this.renderTool()}</div>
      </div>
    );
  }
}

Tools.propTypes = {
  activeTool: PropTypes.string.isRequired,
  onToolButtonClick: PropTypes.func,
};
