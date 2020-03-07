import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Icon } from 'semantic-ui-react';

import styles from './AddContainer.module.css';

export class AddContainerButton extends Component {
  render() {
    return (
      <Dropdown
        trigger={
          <div className={styles.addContainerButton}>
            <Icon name="plus circle" link title="Add Container" size="large" />
          </div>
        }
        icon={null}
      >
        <Dropdown.Menu>
          <Dropdown.Item onClick={this.handleItemClick} text="Add Plate..." />
          <Dropdown.Item onClick={this.handleItemClick} text="Add Rack..." />
          <Dropdown.Item
            onClick={this.handleItemClick}
            text="Add Container..."
          />
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

AddContainerButton.propTypes = {};
