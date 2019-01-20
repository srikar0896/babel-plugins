import React from 'react';
import Message from 'components/Message';

const hello = () => {
  return React.createElement(Message, {
    show: false
  }, "Hello world");
};