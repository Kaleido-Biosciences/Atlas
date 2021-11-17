import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Menu, Transition } from '@headlessui/react';

export class PlateTypeDropdown extends Component {
  handleClick = (plateType) => {
    if (this.props.onSelect) {
      this.props.onSelect(plateType);
    }
  };
  render() {
    let buttonClasses =
      'inline-flex items-center px-2.5 py-1.5 border text-xs font-medium rounded focus:outline-none border-gray-300 text-gray-700 bg-white';
    if (!this.props.disabled) {
      buttonClasses += ' hover:bg-gray-50 disabled:opacity-50';
    }
    return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className={buttonClasses}>Set Plate Type</Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              style={{ zIndex: 200 }}
              className="absolute right-0 w-56 mt-2 text-xs origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="px-1 py-1 ">
                {this.props.plateTypes.map((plateType) => {
                  return (
                    <Menu.Item key={plateType.id}>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            this.handleClick(plateType);
                          }}
                          className={`${
                            active
                              ? 'bg-indigo-500 text-white'
                              : 'text-gray-900'
                          }  group flex rounded-md items-center w-full px-2 py-2 text-xs`}
                        >
                          {`${plateType.name}, ${plateType.numRows} x ${plateType.numCols}`}
                        </button>
                      )}
                    </Menu.Item>
                  );
                })}
              </div>
            </Menu.Items>
          </Transition>
        </div>
      </Menu>
    );
  }
}

PlateTypeDropdown.propTypes = {
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
  plateTypes: PropTypes.array,
};
