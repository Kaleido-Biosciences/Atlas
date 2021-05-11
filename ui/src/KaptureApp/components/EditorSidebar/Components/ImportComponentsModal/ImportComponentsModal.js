import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Header } from 'semantic-ui-react';

import { ImportTextArea } from './ImportTextArea';
import { ImportResults } from './ImportResults';
import styles from './ImportComponentsModal.module.css';

export class ImportComponentsModal extends Component {
  handleAddClick = () => {
    if (this.props.onAddClick) {
      this.props.onAddClick();
      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  };
  render() {
    const {
      open,
      onClose,
      importPending,
      importComplete,
      importError,
      textAreaValue,
      componentNames,
      onTextAreaChange,
      onImportClick,
      foundResults,
      notFoundResults,
      onBackClick,
    } = this.props;
    let view,
      componentNameCount = 0;
    if (componentNames && componentNames.length) {
      componentNameCount = componentNames.length;
    }
    if (!importPending && !importComplete && !importError) {
      view = (
        <ImportTextArea
          value={textAreaValue}
          componentNameCount={componentNameCount}
          onChange={onTextAreaChange}
          onImportClick={onImportClick}
        />
      );
    } else {
      view = (
        <ImportResults
          found={foundResults}
          notFound={notFoundResults}
          total={componentNameCount}
          completed={importComplete}
          onBackClick={onBackClick}
          onAddClick={this.handleAddClick}
        />
      );
    }
    return (
      <Modal
        open={open}
        onClose={onClose}
        closeIcon
        size="small"
        dimmer="inverted"
      >
        <Header icon="download" content="Import Components" />
        <Modal.Content>
          <div className={styles.importComponents}>{view}</div>
        </Modal.Content>
      </Modal>
    );
  }
}

ImportComponentsModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  importPending: PropTypes.bool,
  importComplete: PropTypes.bool,
  importError: PropTypes.string,
  textAreaValue: PropTypes.string,
  componentNames: PropTypes.array,
  onTextAreaChange: PropTypes.func,
  onImportClick: PropTypes.func,
  foundResults: PropTypes.array,
  notFoundResults: PropTypes.array,
  onAddClick: PropTypes.func,
  onBackClick: PropTypes.func,
};
