import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

export class AddAttributeForm extends React.Component {
  render() {
    const { onClose } = this.props;
    return (
      <div>
        Add Attribute Form
        <Icon name="close" onClick={onClose} />
      </div>
    );
  }
}

AddAttributeForm.propTypes = {
  onClose: PropTypes.func,
};
