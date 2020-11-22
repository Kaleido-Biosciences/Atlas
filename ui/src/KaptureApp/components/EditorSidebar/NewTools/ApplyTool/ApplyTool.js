import React from 'react';
import PropTypes from 'prop-types';

import { AddButtons } from './AddButtons';

export class ApplyTool extends React.Component {
  render() {
    const { onComponentSearchChange } = this.props;
    return (
      <div>
        <AddButtons onComponentSearchChange={onComponentSearchChange} />
      </div>
    );
  }
}

ApplyTool.propTypes = {
  onComponentSearchChange: PropTypes.func,
};
