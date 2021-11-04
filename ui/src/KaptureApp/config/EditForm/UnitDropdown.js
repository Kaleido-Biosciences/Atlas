import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Listbox, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

export class UnitDropdown extends Component {
  handleChange = (option) => {
    if (this.props.onChange) this.props.onChange(option);
  };
  render() {
    const { options, value } = this.props;
    const selectedOption = value
      ? options.find((option) => option.id === value)
      : null;
    const buttonText = selectedOption ? selectedOption.abbreviation : 'Unit';
    return (
      <Listbox value={selectedOption} onChange={this.handleChange}>
        <div className="mt-1 relative">
          <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm px-2 py-1 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-xxs">
            <span className="w-full inline-flex truncate">
              <span className="truncate">{buttonText}</span>
            </span>
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
            <Listbox.Options className="absolute z-10 mt-1 w-50 bg-white shadow-lg max-h-60 rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none text-10">
              {options.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    classNames(
                      active ? 'text-white bg-indigo-600' : 'text-gray-900',
                      'cursor-default select-none relative py-2 pl-3 pr-9 text-10'
                    )
                  }
                  value={option}
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
                          {option.abbreviation}
                        </span>
                        <span
                          className={classNames(
                            active ? 'text-indigo-200' : 'text-gray-500',
                            'ml-2 truncate'
                          )}
                        >
                          {option.name}
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

UnitDropdown.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.number,
};
