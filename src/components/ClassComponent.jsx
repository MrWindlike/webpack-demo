import { Component } from 'react';

class ClassComponent extends Component {
  static propTypes = {
    title: 
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
    return <p onClick={this.onClick}>{this.state.text}</p>;
  }
}

export default ClassComponent;
