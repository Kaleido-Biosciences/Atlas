import React, { Component } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  editing: false,
  inputValue: '',
};

export class EditableText extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = initialState;
  }
  handleDoubleClick = (e) => {
    e.stopPropagation();
    this.setState({
      editing: true,
      inputValue: this.props.value,
    });
  };
  handleClick = (e) => {
    e.stopPropagation();
  };
  handleChange = (e) => {
    this.setState({
      inputValue: e.currentTarget.value,
    });
  };
  handleKeyUp = (e) => {
    if (e.key === 'Escape') {
      this.setState(initialState);
    } else if (e.key === 'Enter') {
      const { inputValue } = this.state;
      this.setState(initialState);
      this.saveValue(inputValue);
    }
  };
  handleBlur = (e) => {
    const { inputValue } = this.state;
    this.setState(initialState);
    this.saveValue(inputValue);
  };
  saveValue(value) {
    if (this.props.onSave) {
      if (value !== this.props.value) {
        this.props.onSave(value);
      }
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.editing && !prevState.editing) {
      this.inputRef.current.focus();
    }
  }
  render() {
    return (
      <div>
        {this.state.editing ? (
          <input
            className="block px-1 py-0.5 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onClick={this.handleClick}
            onKeyUp={this.handleKeyUp}
            ref={this.inputRef}
            value={this.state.inputValue}
            size="10"
          />
        ) : (
          <span
            onClick={this.handleClick}
            onDoubleClick={this.handleDoubleClick}
          >
            {this.props.value}
          </span>
        )}
      </div>
    );
  }
}

EditableText.propTypes = {
  onSave: PropTypes.func,
  value: PropTypes.string,
};
