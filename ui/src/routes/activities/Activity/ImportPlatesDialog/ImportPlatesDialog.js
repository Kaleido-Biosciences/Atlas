import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, Spinner } from 'ui';
import { ActivitySearch } from '../../../home/ActivitySearch';
import { PlateOption } from './PlateOption';
import styles from './ImportPlateDialog.module.css';

export class ImportPlatesDialog extends Component {
  constructor(props) {
    super(props);
    this.activitySearchRef = createRef();
  }
  handleActivitySelect = (id, name) => {
    this.props.onActivitySelect(name);
  };
  handlePlateOptionChange = (targetPlate, sourcePlate) => {
    const sourcePlateId = sourcePlate ? sourcePlate.id : null;
    this.props.onMappingChange([
      { targetId: targetPlate.id, sourceId: sourcePlateId },
    ]);
  };
  handleUseForAll = (plateId) => {
    const { importMappings } = this.props;
    const newMappings = importMappings.map((mapping) => {
      return {
        targetId: mapping.targetId,
        sourceId: plateId,
      };
    });
    this.props.onMappingChange(newMappings);
  };
  handleClearAll = () => {
    const { importMappings } = this.props;
    const newMappings = importMappings.map((mapping) => {
      return {
        targetId: mapping.targetId,
        sourceId: null,
      };
    });
    this.props.onMappingChange(newMappings);
  };
  renderPlateOptions = () => {
    const targetPlates = this.props.targetPlates;
    const sourceActivity = this.props.sourceActivity;
    const sourcePlates = sourceActivity.plates;
    const importMappings = this.props.importMappings;
    const options = targetPlates.map((plate) => {
      const mapping = importMappings.find(
        (mapping) => mapping.targetId === plate.id
      );
      return (
        <PlateOption
          key={plate.id}
          targetPlate={plate}
          sourcePlates={sourcePlates}
          value={mapping.sourceId}
          onChange={this.handlePlateOptionChange}
          onUseForAll={this.handleUseForAll}
        />
      );
    });
    return (
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left text-xs font-medium text-gray-500 uppercase py-1">
              Target
            </th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase py-1">
              Source
            </th>
            <th className="w-28"></th>
          </tr>
        </thead>
        <tbody>{options}</tbody>
      </table>
    );
  };
  renderSourceActivity() {
    return (
      <div className="px-4 pt-2 pb-4 flex flex-col h-full overflow-hidden">
        <div className={styles.options}>{this.renderPlateOptions()}</div>
        <div className="flex justify-end pt-3">
          <Button secondary onClick={this.handleClearAll} className="mr-2">
            Clear All
          </Button>
          <Button secondary onClick={this.props.onStartOver} className="mr-2">
            Start Over
          </Button>
          <Button onClick={this.props.onImport}>Import</Button>
        </div>
      </div>
    );
  }
  render() {
    let content;
    if (!this.props.sourceActivity) {
      content = (
        <>
          <div className="px-4 pt-4">
            <ActivitySearch
              inputRef={this.activitySearchRef}
              onInputFocus={this.props.onActivitySearchInputFocus}
              onSelect={this.handleActivitySelect}
            />
          </div>
          {this.props.loadingSourceActivity && (
            <div className="flex items-center justify-center p-6 w-full">
              <Spinner />
            </div>
          )}
          {this.props.loadingSourceActivityError && (
            <div className="rounded-md bg-red-50 p-4 m-4">
              <h3 className="text-sm font-medium text-red-800">
                An error occured while loading the source activity:
              </h3>
              <div className="mt-1 text-sm text-red-700">
                {this.props.loadingSourceActivityError}
              </div>
            </div>
          )}
        </>
      );
    } else {
      if (this.props.importPending) {
        content = (
          <div className="flex items-center justify-center p-6 w-full">
            <Spinner />
          </div>
        );
      } else if (this.props.importError) {
        content = (
          <div className="m-4">
            <div className="rounded-md bg-red-50 p-4 ">
              <h3 className="text-sm font-medium text-red-800">
                An error occured while importing plates:
              </h3>
              <div className="mt-1 text-sm text-red-700">
                {this.props.importError}
              </div>
            </div>
            <div className="mt-2">
              <Button
                secondary
                onClick={this.props.onStartOver}
                className="mr-2"
              >
                Start Over
              </Button>
              <Button onClick={this.props.onImport}>Try again</Button>
            </div>
          </div>
        );
      } else if (this.props.importSuccess) {
        content = (
          <div className="p-4 h-full flex flex-col justify-center items-center">
            <FontAwesomeIcon
              icon="check-circle"
              className="text-green-400 text-6xl"
            />
            <div className="text-xl mt-2">Import Successful</div>
            <Button className="mt-6" onClick={this.props.onClose}>
              Close
            </Button>
          </div>
        );
      } else {
        content = this.renderSourceActivity();
      }
    }
    return (
      <Dialog
        initialFocusRef={this.activitySearchRef}
        onClose={this.props.onClose}
        open={this.props.open}
        title="Import Plates"
      >
        <div className={styles.dialogBody}>{content}</div>
      </Dialog>
    );
  }
}

ImportPlatesDialog.propTypes = {
  importError: PropTypes.string,
  importMappings: PropTypes.array,
  importPending: PropTypes.bool,
  importSuccess: PropTypes.bool,
  loadingSourceActvity: PropTypes.bool,
  loadingSourceActivityError: PropTypes.string,
  onActivitySearchInputFocus: PropTypes.func,
  onActivitySelect: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  onImport: PropTypes.func.isRequired,
  onStartOver: PropTypes.func.isRequired,
  open: PropTypes.bool,
  sourceActivity: PropTypes.object,
  targetPlates: PropTypes.array,
};
