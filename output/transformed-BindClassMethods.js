import React from 'react';

class TestAutoBind extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    this.setState(prevState => {
      count: prevState.count + 1;
    });
  }

  decrement() {
    this.setState(prevState => {
      count: prevState.count - 1;
    });
  }

  render() {
    return React.createElement("span", null, this.state.count);
  }

}