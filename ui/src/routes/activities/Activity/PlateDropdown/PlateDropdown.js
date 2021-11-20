import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Listbox, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

export class PlateDropdown extends Component {
  handleChange = (plate) => {
    if (this.props.onChange) {
      this.props.onChange(plate.id);
    }
  };
  render() {
    const selectedPlate = this.props.plates.find((plate) => plate.selected);
    return (
      <Listbox value={selectedPlate} onChange={this.handleChange}>
        <div className="mt-1 relative">
          <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-xs">
            {selectedPlate ? (
              <span className="w-full inline-flex truncate">
                <span className="truncate">{selectedPlate.name}</span>
                <span className="ml-2 truncate text-gray-500">
                  {selectedPlate.barcode}
                </span>
              </span>
            ) : (
              <span className="w-full inline-flex truncate">
                <span className="truncate">Select Plate</span>
              </span>
            )}
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FontAwesomeIcon
                className="h-5 w-5 text-gray-400"
                icon="angle-down"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {this.props.plates.map((plate) => (
                <Listbox.Option
                  key={plate.id}
                  className={({ active }) =>
                    classNames(
                      active ? 'text-white bg-indigo-600' : 'text-gray-900',
                      'cursor-default select-none relative py-2 pl-3 pr-9 text-xs'
                    )
                  }
                  value={plate}
                >
                  {({ selected, active }) => (
                    <>
                      <div className="flex">
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'truncate'
                          )}
                        >
                          {plate.name}
                        </span>
                        <span
                          className={classNames(
                            active ? 'text-indigo-200' : 'text-gray-500',
                            'ml-2 truncate'
                          )}
                        >
                          {plate.barcode}
                        </span>
                      </div>

                      {selected ? (
                        <span
                          className={classNames(
                            active ? 'text-white' : 'text-indigo-600',
                            'absolute inset-y-0 right-0 flex items-center pr-4'
                          )}
                        >
                          <FontAwesomeIcon
                            className="h-5 w-5"
                            icon="check"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    );
  }
}

PlateDropdown.propTypes = {
  onChange: PropTypes.func,
  plates: PropTypes.array,
};
