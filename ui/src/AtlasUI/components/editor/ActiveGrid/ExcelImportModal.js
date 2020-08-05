import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Header,
  Button,
  Form,
  TextArea,
  Select,
  Loader,
  Icon,
  Message,
} from 'semantic-ui-react';
import validate from 'validate.js';

import { ErrorRow } from './ErrorRow';
import { ImportTimepoints } from './ImportTimepoints';

import styles from './ExcelImportModal.module.css';

const initialState = {
  componentType: '',
  importText: '',
  displayTimepoints: false,
  allowAddTimepoint: false,
  timepoints: [],
  timepointErrors: null,
};

export class ExcelImportModal extends Component {
  state = initialState;
  getComponentTypeOptions() {
    const { componentTypes } = this.props;
    const options = [];
    componentTypes.forEach((type) => {
      if (type.allowExcelImport) {
        options.push({ key: type.name, value: type.name, text: type.name });
      }
    });
    return options;
  }
  getComponentOptions(components) {
    return components.map((component) => {
      return { key: component.id, value: component.id, text: component.name };
    });
  }
  handleSelectChange = (e, { value }) => {
    let displayTimepoints = false;
    const type = this.props.componentTypes.find((type) => {
      return type.name === value;
    });
    if (
      type &&
      type.enableOptions &&
      type.enableOptions.includes('concentration')
    ) {
      displayTimepoints = true;
    }
    const timepoint = {
      concentration: type.defaultConcentration,
      time: type.defaultTime,
    };
    this.setState({
      componentType: value,
      displayTimepoints,
      allowAddTimepoint: type.allowAddTimepoint,
      timepoints: [timepoint],
    });
  };
  handleTextareaChange = (e, { value }) => {
    this.setState({ importText: value });
  };
  handleTimepointChange = ({ name, index, value }) => {
    const newTimepoints = this.state.timepoints.slice();
    const newTimepoint = {
      ...newTimepoints[index],
      [name]: value,
    };
    newTimepoints.splice(index, 1, newTimepoint);
    const errors = validate.single(
      newTimepoints,
      { timepoints: true },
      { fullMessages: false }
    );
    this.setState({
      timepoints: newTimepoints,
      timepointErrors: errors || null,
    });
  };
  handleAddTimepointClick = () => {
    const { timepoints } = this.state;
    let maxTime = 0;
    timepoints.forEach((timepoint) => {
      if (timepoint.time > maxTime) maxTime = timepoint.time;
    });
    const lastPoint = timepoints[timepoints.length - 1];
    const timepoint = {
      concentration: lastPoint.concentration,
      time: maxTime + 24,
    };
    const newTimepoints = [...timepoints, timepoint];
    this.setState({
      timepoints: newTimepoints,
    });
  };
  handleTimepointDeleteClick = ({ index }) => {
    const newTimepoints = this.state.timepoints.slice();
    newTimepoints.splice(index, 1);
    this.setState({
      timepoints: newTimepoints,
    });
  };
  handleImport = () => {
    const { componentType, importText, timepoints } = this.state;
    let components = importText.split('\n');
    components = components.map((row) => {
      return row.split('\t');
    });
    if (this.props.onImportComponentsClick) {
      this.props.onImportComponentsClick(componentType, components, timepoints);
    }
  };
  handleStartOver = () => {
    this.setState(initialState);
    if (this.props.onStartOverClick) this.props.onStartOverClick();
  };
  handleApplyClick = () => {
    if (this.props.onApplyClick) {
      this.props.onApplyClick();
    }
    this.setState(initialState);
  };
  handleFix = (row, column, componentId) => {
    if (this.props.onFixClick) this.props.onFixClick(row, column, componentId);
  };
  handleFixAll = (row, column, componentId) => {
    if (this.props.onFixAllClick)
      this.props.onFixAllClick(row, column, componentId);
  };
  renderErrors() {
    const { componentImportErrors } = this.props;
    const rows = componentImportErrors.map((error) => {
      const position = `${error.row}${error.column}`;
      const options = this.getComponentOptions(error.options);
      return (
        <ErrorRow
          key={position}
          error={error}
          options={options}
          onFixClick={this.handleFix}
          onFixAllClick={this.handleFixAll}
        />
      );
    });
    return (
      <div className={styles.componentImportErrors}>
        <table className={styles.componentImportErrorsTable}>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
  renderForm() {
    const {
      componentType,
      importText,
      displayTimepoints,
      timepoints,
      timepointErrors,
      allowAddTimepoint,
    } = this.state;
    return (
      <div>
        <Form>
          <Form.Field>
            <label>Component type:</label>
            <Select
              options={this.getComponentTypeOptions()}
              onChange={this.handleSelectChange}
              value={componentType}
              placeholder="Select component type"
              selectOnBlur={false}
            />
          </Form.Field>
          <Form.Field>
            <label>Paste plate data here:</label>
            <TextArea onChange={this.handleTextareaChange} value={importText} />
          </Form.Field>
          {displayTimepoints && (
            <ImportTimepoints
              timepoints={timepoints}
              errors={timepointErrors}
              allowAddTimepoint={allowAddTimepoint}
              onTimepointChange={this.handleTimepointChange}
              onAddClick={this.handleAddTimepointClick}
              onDeleteClick={this.handleTimepointDeleteClick}
            />
          )}
        </Form>
      </div>
    );
  }
  renderSuccess() {
    const { importedComponents } = this.props;
    return (
      <div className={styles.successMessage}>
        <Icon name="check circle" color="green" size="huge" />
        <div className={styles.successText}>
          {importedComponents.length} components imported
        </div>
      </div>
    );
  }
  isStateValid() {
    const {
      componentType,
      importText,
      displayTimepoints,
      timepointErrors,
    } = this.state;
    let valid = true;
    if (!componentType) {
      valid = false;
    }
    if (!importText) {
      valid = false;
    }
    if (displayTimepoints && timepointErrors && timepointErrors.length) {
      valid = false;
    }
    return valid;
  }
  render() {
    const {
      open,
      onClose,
      importStarted,
      importPending,
      importError,
      importedComponents,
      componentImportErrors,
    } = this.props;
    const importDisabled = !this.isStateValid();
    return (
      <Modal
        open={open}
        onClose={onClose}
        closeIcon
        size="small"
        dimmer="inverted"
      >
        <Header icon="download" content="Import from Excel" />
        <Modal.Content>
          {!importStarted && !importPending && this.renderForm()}
          {importPending && (
            <div>
              <Loader active inline="centered">
                Importing components
              </Loader>
            </div>
          )}
          {importStarted && !importPending && importError && (
            <Message
              negative
              className={styles.importErrorMessage}
              icon="warning circle"
              header="An error occurred while importing:"
              content={importError}
            />
          )}
          {importStarted && !importPending && componentImportErrors.length > 0 && (
            <div>
              <div className={styles.componentImportErrorsMessage}>
                Some components could not be imported. You can
                <ul className={styles.componentImportErrorsList}>
                  <li>Fix the errors below</li>
                  <li>Fix the errors in Excel and start over</li>
                  <li>
                    Skip the errors and apply only components that were found
                  </li>
                </ul>
              </div>
              {this.renderErrors()}
            </div>
          )}
          {importStarted &&
            !importPending &&
            !importError &&
            componentImportErrors.length === 0 && (
              <div>{this.renderSuccess()}</div>
            )}
        </Modal.Content>
        <Modal.Actions>
          {!importStarted && !importPending && (
            <Button
              primary
              onClick={this.handleImport}
              disabled={importDisabled}
            >
              Import Components
            </Button>
          )}
          {importStarted && !importPending && (
            <React.Fragment>
              <Button onClick={this.handleStartOver}>Start over</Button>
              {!importError && (
                <Button
                  primary={componentImportErrors.length === 0}
                  onClick={this.handleApplyClick}
                  disabled={importedComponents.length === 0}
                >{`Apply ${importedComponents.length} components`}</Button>
              )}
            </React.Fragment>
          )}
        </Modal.Actions>
      </Modal>
    );
  }
}

ExcelImportModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  importStarted: PropTypes.bool,
  importPending: PropTypes.bool,
  importError: PropTypes.string,
  importedComponents: PropTypes.array,
  componentImportErrors: PropTypes.array,
  componentTypes: PropTypes.array,
  onImportComponentsClick: PropTypes.func,
  onApplyClick: PropTypes.func,
  onFixClick: PropTypes.func,
  onFixAllClick: PropTypes.func,
  onStartOverClick: PropTypes.func,
};
