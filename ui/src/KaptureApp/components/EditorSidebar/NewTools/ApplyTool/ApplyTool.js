import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import { ComponentSearch } from './ComponentSearch';
import { AddAttributeForm } from './AddAttributeForm';
import { ToolComponentList } from './ToolComponentList';
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
    if (this.props.onAddComponent) {
      this.props.onAddComponent(component);
    }
    this.hideComponentSearch();
  };
  render() {
    const { showComponentSearch, showAddAttributeForm } = this.state;
    return (
      <div className={styles.applyTool}>
        <div className={styles.addButtonsContainer}>
          <Button
            content="Component"
            icon="plus circle"
            onClick={this.showComponentSearch}
            size="mini"
          />
          <Button
            content="Attribute"
            icon="plus circle"
            onClick={this.showAddAttributeForm}
            size="mini"
          />
        </div>
        {!showComponentSearch && !showAddAttributeForm && (
          <ToolComponentList
            toolComponents={this.props.toolComponents}
            onSelectionsChange={this.props.onComponentSelectionsChange}
            onRemove={this.props.onRemoveComponent}
          />
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
          <AddAttributeForm onClose={this.hideAddAttributeForm} />
        )}
      </div>
    );
  }
}

ApplyTool.propTypes = {
  componentSearchComplete: PropTypes.bool,
  componentSearchPending: PropTypes.bool,
  componentSearchResults: PropTypes.array,
  componentSearchTerm: PropTypes.string,
  onAddComponent: PropTypes.func,
  onComponentSearchChange: PropTypes.func,
  onComponentSearchHide: PropTypes.func,
  onComponentSelectionsChange: PropTypes.func,
  onRemoveComponent: PropTypes.func,
  onUnmount: PropTypes.func,
  toolComponents: PropTypes.array,
};
