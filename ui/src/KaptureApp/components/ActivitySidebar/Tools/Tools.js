import React from 'react';
import PropTypes from 'prop-types';
import { ApplyTool } from './ApplyTool';
import { RemoveTool } from './RemoveTool';
import { SelectTool } from './SelectTool';
import { ButtonGroup } from 'KaptureApp/components';
import styles from './Tools.module.css';

export class Tools extends React.Component {
  handleToolClick = (e) => {
    if (this.props.onToolButtonClick) {
      this.props.onToolButtonClick(e.currentTarget.name);
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
      <div className="h-full flex flex-col">
        <div className="flex flex-none px-3 py-3">
          <ButtonGroup
            buttons={[
              {
                name: 'apply',
                icon: 'paint-brush',
                onClick: this.handleToolClick,
                active: activeTool === 'apply',
                title: 'Apply Tool',
              },
              {
                name: 'select',
                icon: 'check-square',
                onClick: this.handleToolClick,
                active: activeTool === 'select',
                title: 'Select Tool',
              },
              {
                name: 'remove',
                icon: 'trash',
                onClick: this.handleToolClick,
                active: activeTool === 'remove',
                title: 'Remove Tool',
              },
            ]}
          />
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
