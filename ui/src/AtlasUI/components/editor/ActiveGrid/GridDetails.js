import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Dropdown, Button } from 'semantic-ui-react';

import { Settings } from '../Settings';
import { ExcelImportModal } from './ExcelImportModal';
import styles from './GridDetails.module.css';

export class GridDetails extends Component {
  state = {
    importModalOpen: false,
  };
  handleOpenImportModal = () => {
    this.setState({ importModalOpen: true });
  };
  handleCloseImportModal = () => {
    this.setState({ importModalOpen: false });
  };
  handleImportApply = () => {
    if (this.props.onImportApplyClick) {
      this.props.onImportApplyClick();
    }
    if (this.props.onImportStartOverClick) {
      this.props.onImportStartOverClick();
    }
    this.handleCloseImportModal();
  };
  handleAddition = (e, { value }) => {
    if (this.props.onBarcodeAdd) {
      this.props.onBarcodeAdd({ barcodes: [value] });
    }
  };
  handleChange = (e, { value }) => {
    if (this.props.onBarcodeSelect) {
      this.props.onBarcodeSelect(this.props.gridId, value);
    }
  };
  render() {
    const {
      gridBarcode,
      barcodeOptions,
      settings,
      onSettingsChange,
      importStarted,
      importPending,
      importError,
      importedComponents,
      componentImportErrors,
      componentTypes,
      onImportComponentsClick,
      onImportFixClick,
      onImportFixAllClick,
      onImportStartOverClick,
    } = this.props;
    return (
      <div className={styles.gridDetails}>
        <div>
          <Icon title="Barcode" name="barcode" />
          <Dropdown
            selection
            search
            allowAdditions
            options={barcodeOptions}
            placeholder="Select barcode"
            onAddItem={this.handleAddition}
            onChange={this.handleChange}
            value={gridBarcode}
            selectOnBlur={false}
          />
        </div>
        <div className={styles.gridActions}>
          <Button
            icon="download"
            content="Import from Excel"
            size="mini"
            onClick={this.handleOpenImportModal}
            className={styles.importButton}
          />
          <ExcelImportModal
            open={this.state.importModalOpen}
            onClose={this.handleCloseImportModal}
            importStarted={importStarted}
            importPending={importPending}
            importError={importError}
            importedComponents={importedComponents}
            componentImportErrors={componentImportErrors}
            componentTypes={componentTypes}
            onImportComponentsClick={onImportComponentsClick}
            onApplyClick={this.handleImportApply}
            onFixClick={onImportFixClick}
            onFixAllClick={onImportFixAllClick}
            onStartOverClick={onImportStartOverClick}
          />
          <div className={styles.settings}>
            <Settings settings={settings} onChange={onSettingsChange} />
          </div>
        </div>
      </div>
    );
  }
}

GridDetails.propTypes = {
  gridId: PropTypes.string,
  gridBarcode: PropTypes.string,
  barcodeOptions: PropTypes.array.isRequired,
  onBarcodeAdd: PropTypes.func,
  onBarcodeSelect: PropTypes.func,
  settings: PropTypes.object,
  onSettingsChange: PropTypes.func,
  importStarted: PropTypes.bool,
  importPending: PropTypes.bool,
  importError: PropTypes.string,
  importedComponents: PropTypes.array,
  componentImportErrors: PropTypes.array,
  componentTypes: PropTypes.array,
  onImportComponentsClick: PropTypes.func,
  onImportApplyClick: PropTypes.func,
  onImportFixClick: PropTypes.func,
  onImportFixAllClick: PropTypes.func,
  onImportStartOverClick: PropTypes.func,
};
