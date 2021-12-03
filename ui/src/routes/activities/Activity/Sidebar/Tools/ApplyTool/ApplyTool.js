import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'ui';
import { ComponentSearch } from './ComponentSearch';
import { ToolComponentList } from './ToolComponentList';
import { SelectedWells } from '../SelectedWells';
import styles from './ApplyTool.module.css';

export class ApplyTool extends React.Component {
  state = {
    showComponentSearch: false,
  };
  componentWillUnmount() {
    if (this.props.onUnmount) {
      this.props.onUnmount();
    }
  }
  showComponentSearch = () => {
    this.setState({
      showComponentSearch: true,
    });
  };
  hideComponentSearch = () => {
    this.setState({
      showComponentSearch: false,
    });
    if (this.props.onComponentSearchHide) {
      this.props.onComponentSearchHide();
    }
  };
  handleAddComponent = (component) => {
    if (this.props.onAddToolComponent) {
      this.props.onAddToolComponent(component);
    }
    this.hideComponentSearch();
  };
  handleApplyClick = () => {
    if (this.props.onApplyClick) {
      this.props.onApplyClick(this.props.activeView.id);
    }
  };
  render() {
    const { showComponentSearch } = this.state;
    return (
      <div className="flex flex-col h-full overflow-auto">
        <div className="flex flex-row flex-none px-3 pb-1">
          <Button
            content="Component"
            icon="plus-circle"
            onClick={this.showComponentSearch}
            className="mr-1"
          />
        </div>
        {!showComponentSearch && (
          <div className={styles.toolComponentsContainer}>
            <div
              className={classNames(
                styles.toolComponentListContainer,
                'px-3',
                'py-1'
              )}
            >
              <ToolComponentList
                onEditClick={this.props.onToolComponentEditClick}
                onSelectionsChange={this.props.onComponentSelectionsChange}
                onRemove={this.props.onRemoveToolComponent}
                onUpdate={this.props.onUpdateToolComponent}
                toolComponents={this.props.toolComponents}
              />
            </div>
            <div className={styles.selectedWellsContainer}>
              <SelectedWells
                activeView={this.props.activeView}
                buttonDisabled={
                  !this.props.toolComponentsValid ||
                  this.props.toolComponents.length === 0
                }
                buttonText="Apply to"
                onButtonClick={this.handleApplyClick}
                plates={this.props.plates}
                showButton={true}
              />
            </div>
          </div>
        )}
        {showComponentSearch && (
          <ComponentSearch
            searchComplete={this.props.componentSearchComplete}
            searchPending={this.props.componentSearchPending}
            searchResults={this.props.componentSearchResults}
            searchTerm={this.props.componentSearchTerm}
            onClose={this.hideComponentSearch}
            onComponentClick={this.handleAddComponent}
            onSearchChange={this.props.onComponentSearchChange}
          />
        )}
      </div>
    );
  }
}

ApplyTool.propTypes = {
  activeView: PropTypes.object,
  componentSearchComplete: PropTypes.bool,
  componentSearchPending: PropTypes.bool,
  componentSearchResults: PropTypes.array,
  componentSearchTerm: PropTypes.string,
  onAddToolComponent: PropTypes.func,
  onApplyClick: PropTypes.func,
  onComponentSearchChange: PropTypes.func,
  onComponentSearchHide: PropTypes.func,
  onComponentSelectionsChange: PropTypes.func,
  onRemoveToolComponent: PropTypes.func,
  onToolComponentEditClick: PropTypes.func,
  onUnmount: PropTypes.func,
  onUpdateToolComponent: PropTypes.func,
  plates: PropTypes.array,
  toolComponents: PropTypes.array,
  toolComponentsValid: PropTypes.bool,
};
