import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ClassComponent extends Component {
  static propTypes = {
    title: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      text: 'Hello React'
    };
  }

  onClick = () => {
    new Promise((resolve, reject) => {
      resolve(this.state.text);
    }).then(text => this.setState({ text: `${text}!` }));
  };

  render() {
    return (
      <React.Fragment>
        <h1>{this.props.title}</h1>
        <p onClick={this.onClick}>{this.state.text}</p>
      </React.Fragment>
    );
  }
}

export default ClassComponent;
