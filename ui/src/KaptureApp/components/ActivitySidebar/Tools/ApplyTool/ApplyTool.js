import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'KaptureApp/components/Button';

import { ComponentSearch } from './ComponentSearch';
import { AddAttributeForm } from './AddAttributeForm';
import { ToolComponentList } from './ToolComponentList';
import { SelectedContainers } from '../SelectedContainers';
import styles from './ApplyTool.module.css';

export class ApplyTool extends React.Component {
  state = {
    showComponentSearch: false,
    showAddAttributeForm: false,
  };
  componentWillUnmount() {
    if (this.props.onUnmount) {
      this.props.onUnmount();
    }
  }
  showComponentSearch = () => {
    this.hideAddAttributeForm();
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
  showAddAttributeForm = () => {
    this.hideComponentSearch();
    this.setState({
      showAddAttributeForm: true,
    });
  };
  hideAddAttributeForm = () => {
    this.setState({
      showAddAttributeForm: false,
    });
  };
  handleAddComponent = (component) => {
    if (this.props.onAddToolComponent) {
      this.props.onAddToolComponent(component);
    }
    this.hideComponentSearch();
  };
  handleAddAttribute = (attributeData) => {
    if (this.props.onAddAttribute) {
      this.props.onAddAttribute(attributeData);
    }
    this.hideAddAttributeForm();
  };
  handleApplyClick = () => {
    if (this.props.onApplyClick) {
      this.props.onApplyClick(this.props.activeView.id);
    }
  };
  render() {
    const { showComponentSearch, showAddAttributeForm } = this.state;
    return (
      <div className={styles.applyTool}>
        <div className={styles.addButtonsContainer}>
          <Button
            content="Component"
            icon="plus-circle"
            onClick={this.showComponentSearch}
            className="mr-1"
          />
          <Button
            content="Attribute"
            icon="plus-circle"
            onClick={this.showAddAttributeForm}
            secondary
          />
        </div>
        {!showComponentSearch && !showAddAttributeForm && (
          <div className={styles.toolComponentsContainer}>
            <div className={styles.toolComponentListContainer}>
              <ToolComponentList
                componentTypes={this.props.componentTypes}
                onEditClick={this.props.onToolComponentEditClick}
                onSelectionsChange={this.props.onComponentSelectionsChange}
                onRemove={this.props.onRemoveToolComponent}
                onUpdate={this.props.onUpdateToolComponent}
                toolComponents={this.props.toolComponents}
              />
            </div>
            <div className={styles.selectedContainersContainer}>
              {/* <SelectedContainers
                activeView={this.props.activeView}
                buttonDisabled={
                  !this.props.toolComponentsValid ||
                  this.props.toolComponents.length === 0
                }
                buttonText="Apply to"
                onButtonClick={this.handleApplyClick}
                showButton={true}
              /> */}
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
        {showAddAttributeForm && (
          <AddAttributeForm
            onClose={this.hideAddAttributeForm}
            onSubmit={this.handleAddAttribute}
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
  componentTypes: PropTypes.array,
  onAddAttribute: PropTypes.func,
  onAddToolComponent: PropTypes.func,
  onApplyClick: PropTypes.func,
  onComponentSearchChange: PropTypes.func,
  onComponentSearchHide: PropTypes.func,
  onComponentSelectionsChange: PropTypes.func,
  onRemoveToolComponent: PropTypes.func,
  onToolComponentEditClick: PropTypes.func,
  onUnmount: PropTypes.func,
  onUpdateToolComponent: PropTypes.func,
  toolComponents: PropTypes.array,
  toolComponentsValid: PropTypes.bool,
};
