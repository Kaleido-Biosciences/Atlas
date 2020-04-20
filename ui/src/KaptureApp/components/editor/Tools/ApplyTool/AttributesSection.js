import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ComponentsSection } from './ComponentsSection';
import { AddAttributeComponent } from './AddAttributeComponent';

export class AttributesSection extends Component {
  render() {
    const { attributes } = this.props;
    return (
      <React.Fragment>
        <ComponentsSection
          label={'Attributes'}
          labelDescription={
            'Use attributes to include additional smaple meta data'
          }
          components={attributes}
          showTimepoints={false}
          allowTimepointTimeChange={false}
          allowAddTimepoint={false}
        />
        <AddAttributeComponent onAddClick={this.props.addAttribute} />
      </React.Fragment>
    );
  }
}

AttributesSection.propTypes = {
  attributes: PropTypes.array,
  addAttribute: PropTypes.func,
};
