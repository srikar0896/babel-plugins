# babel-plugins

Silly Babel plugins.

## Plugin - propsDefaultValueToFalse

```
import React from 'react';
import Message from 'components/Message';

const hello = () => {
  return (
    <Message show>
      Hello world
    </Message>
    );
}
```
And transformed to the below code if you are using `react` preset.
```
import React from 'react';
import Message from 'components/Message';

const hello = () => {
  return React.createElement(Message, {
    show: true
  }, "Hello world");
};
```

### Output
By default props with no value are interpreted as `Boolean` attribute and interpreted as `true`, so with this plugin we can change that to `false` if the props has not been given a value

```
import React from 'react';
import Message from 'components/Message';

const hello = () => {
  return React.createElement(Message, {
    show: false
  }, "Hello world");
};
```

## Plugin - BindClassMethods
This plugin binds methods in constructor.
```
import React from 'react';

class TestAutoBind extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  increment() {
    this.setState(prevState => {count: prevState.count + 1})
  }

  decrement() {
    this.setState(prevState => {count: prevState.count - 1})
  }

  render() {
    return (
      <span>
        {this.state.count}
      </span>
    )
  }
}
```
### Output

```
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
```
