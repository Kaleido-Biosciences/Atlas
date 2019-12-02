import React, { Component } from 'react';
import queryString from 'query-string';

export class Editor extends Component {
  componentDidMount() {
    console.log(queryString.parse(this.props.location.search));
  }
  render() {
    return <div>editor</div>;
  }
}
