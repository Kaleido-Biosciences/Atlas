import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ComponentTooltip } from 'AtlasUI/components';

export class Component extends React.Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.component);
    }
  };
  render() {
    const { component } = this.props,
      divProps = {
        className: classNames(
          'rounded',
          'mb-1',
          'py-2',
          'px-3',
          'text-white',
          'text-xxs',
          'cursor-pointer',
          component.defaultBgClass,
          'hover:' + component.darkBgClass
        ),
      };
    if (component.tooltip.length) {
      divProps['data-tip'] = true;
      divProps['data-for'] = `list-component-${component.id}`;
    }
    return (
      <div {...divProps} onClick={this.handleClick}>
        <div className="flex flex-row justify-between items-center">
          <div className="font-medium">{component.name}</div>
          <div className="opacity-40">{component.singularTypeDisplayName}</div>
        </div>
        {component.tooltip.length > 0 && (
          <ComponentTooltip
            id={`list-component-${component.id}`}
            tooltip={component.tooltip}
          />
        )}
      </div>
    );
  }
}

Component.propTypes = {
  component: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
