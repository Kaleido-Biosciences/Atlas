import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon } from 'semantic-ui-react';

import { Timepoint } from 'KaptureApp/components/editor/Tools/ApplyTool/Timepoint';
import styles from './ExcelImportModal.module.css';

export class ImportTimepoints extends Component {
  render() {
    const {
      timepoints,
      errors,
      allowAddTimepoint,
      onTimepointChange,
      onAddClick,
      onDeleteClick,
    } = this.props;
    let errorsContent;
    if (errors && errors.length > 0) {
      errorsContent = errors.map((error, i) => {
        return <div key={i}>{error}</div>;
      });
    }
    return (
      <Form.Field>
        <label>Concentration and time to be applied to all components:</label>
        <div>
          {timepoints.map((timepoint, i) => {
            return (
              <Timepoint
                timepoint={timepoint}
                index={i}
                key={i}
                onChange={onTimepointChange}
                allowDelete={i > 0}
                onDeleteClick={onDeleteClick}
                allowTimeChange={true}
              />
            );
          })}
          {allowAddTimepoint && (
            <div className={styles.addTimepoint} onClick={onAddClick}>
              <Icon
                title="Add timepoint"
                link
                color="blue"
                name="plus circle"
              />
              Add Timepoint
            </div>
          )}
          <div className={styles.timepointErrors}>{errorsContent}</div>
        </div>
      </Form.Field>
    );
  }
}

ImportTimepoints.propTypes = {
  timepoints: PropTypes.array,
  errors: PropTypes.array,
  allowAddTimepoint: PropTypes.bool,
  onTimepointChange: PropTypes.func,
  onAddClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};
