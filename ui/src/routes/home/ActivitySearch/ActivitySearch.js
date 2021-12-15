import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { SearchResult } from './SearchResult';

const dropdownClasses = [
  'bg-white',
  'shadow',
  'rounded-md',
  'mt-2',
  'border',
  'border-gray-200',
  'max-h-80',
  'overflow-auto',
];

export class ActivitySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      disableBlur: false,
      allowShowNoResults: false,
    };
    this.inputRef = props.inputRef || React.createRef();
  }
  componentDidMount() {
    if (this.props.autoFocus) {
      this.inputRef.current.focus();
    }
  }
  componentDidUpdate() {
    if (this.props.loading && !this.state.allowShowNoResults) {
      this.setState({ allowShowNoResults: true });
    }
    if (!this.props.value && this.state.allowShowNoResults) {
      this.setState({ allowShowNoResults: false });
    }
  }
  componentWillUnmount() {
    if (this.props.onUnmount) {
      this.props.onUnmount();
    }
  }
  handleFocus = () => {
    this.setState({ focused: true });
    if (this.props.onInputFocus) this.props.onInputFocus();
  };
  handleBlur = (event) => {
    if (!this.state.disableBlur) {
      this.setState({ focused: false });
    }
  };
  handleChange = (event) => {
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  };
  handleResultClick = (id, name) => {
    this.inputRef.current.blur();
    this.setState({ focused: false, disableBlur: false });
    if (this.props.onSelect) {
      this.props.onSelect(id, name);
    }
  };
  handleResultsMouseEnter = () => {
    this.setState({ disableBlur: true });
  };
  handleResultsMouseLeave = () => {
    this.setState({ disableBlur: false });
  };
  renderInput() {
    return (
      <input
        autoComplete="off"
        className={classNames(
          'focus:ring-indigo-500',
          'focus:border-indigo-500',
          'block',
          'w-full',
          'pl-4',
          'pr-12',
          'text-sm',
          'border-gray-300',
          'rounded-full',
          'placeholder-gray-400'
        )}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        placeholder={this.props.placeholder}
        ref={this.inputRef}
        type="text"
        value={this.props.value}
      />
    );
  }
  renderIcon() {
    return (
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
        {this.props.loading ? (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="#FFFFFF"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <FontAwesomeIcon icon="search" />
        )}
      </div>
    );
  }
  renderResults() {
    const results = this.props.results.map((result) => {
      return (
        <li key={result.id}>
          <SearchResult
            description={result.description}
            id={result.id}
            name={result.name}
            onClick={this.handleResultClick}
          />
        </li>
      );
    });
    return (
      <div
        className={classNames(dropdownClasses)}
        onMouseEnter={this.handleResultsMouseEnter}
        onMouseLeave={this.handleResultsMouseLeave}
      >
        <ul className="divide-y divide-gray-200 my-1">{results}</ul>
      </div>
    );
  }
  renderError() {
    return (
      <div
        className={classNames(dropdownClasses, 'px-3', 'py-2', 'text-sm')}
        onMouseEnter={this.handleResultsMouseEnter}
        onMouseLeave={this.handleResultsMouseLeave}
      >
        <div className="my-1">{`Error occurred while searching: ${this.props.error}`}</div>
      </div>
    );
  }
  renderNoResults() {
    return (
      <div
        className={classNames(dropdownClasses, 'px-3', 'py-2', 'text-sm')}
        onMouseEnter={this.handleResultsMouseEnter}
        onMouseLeave={this.handleResultsMouseLeave}
      >
        <div className="my-1">{`No activities found.`}</div>
      </div>
    );
  }
  render() {
    const { value, loading, error, results } = this.props;
    let content;
    if (error) {
      content = this.renderError();
    } else if (
      value &&
      !results.length &&
      !loading &&
      this.state.allowShowNoResults
    ) {
      content = this.renderNoResults();
    } else if (results.length) {
      content = this.renderResults();
    }
    return (
      <div className="w-full">
        <div className="mt-1 relative rounded-md shadow-sm">
          {this.renderInput()}
          {this.renderIcon()}
        </div>
        {this.state.focused && content}
      </div>
    );
  }
}

ActivitySearch.propTypes = {
  autoFocus: PropTypes.bool,
  error: PropTypes.string,
  inputRef: PropTypes.object,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  onInputFocus: PropTypes.func,
  onSelect: PropTypes.func,
  onUnmount: PropTypes.func,
  placeholder: PropTypes.string,
  results: PropTypes.array,
  value: PropTypes.string.isRequired,
};

ActivitySearch.defaultProps = {
  autoFocus: false,
  placeholder: 'Search activities',
  value: '',
};
