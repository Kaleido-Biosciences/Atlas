import React from 'react';
import PropTypes from 'prop-types';
import { Search, Icon } from 'semantic-ui-react';

export class AddComponentForm extends React.Component {
  handleSearchChange = (e, { value }) => {
    if (this.props.onSearchChange) this.props.onSearchChange(value);
  };
  render() {
    const { onClose } = this.props;
    return (
      <div>
        <Search onSearchChange={this.handleSearchChange} />
        <Icon name="close" onClick={onClose} />
      </div>
    );
  }
}

AddComponentForm.propTypes = {
  onSearchChange: PropTypes.func,
  onClose: PropTypes.func,
};
