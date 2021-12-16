import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Dialog.module.css';

const dialogClasses = classNames(
  styles.dialog,
  'fixed inset-0 overflow-y-auto'
);

export class Dialog extends Component {
  render() {
    return (
      <Transition.Root show={this.props.open} as={Fragment}>
        <HeadlessDialog
          as="div"
          className={dialogClasses}
          initialFocus={this.props.initialFocusRef}
          onClose={this.props.onClose}
        >
          <div className="flex items-center justify-center min-h-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <HeadlessDialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <span
              className="inline-block align-middle h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all flex flex-col">
                <div className="block absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={this.props.onClose}
                  >
                    <span className="sr-only">Close</span>
                    <FontAwesomeIcon icon="times" />
                  </button>
                </div>
                <HeadlessDialog.Title
                  as="h3"
                  className="px-4 pt-4 text-lg leading-6 font-medium text-gray-900 flex-none"
                >
                  {this.props.title}
                </HeadlessDialog.Title>
                {this.props.children}
              </div>
            </Transition.Child>
          </div>
        </HeadlessDialog>
      </Transition.Root>
    );
  }
}

Dialog.propTypes = {
  initialFocusRef: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
};
