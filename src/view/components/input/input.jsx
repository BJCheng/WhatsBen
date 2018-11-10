import React from 'react';

export default (props) => (
  <input
    type='text'
    value={props.text}
    onChange={props.onChange}
    onKeyPress={props.onEnterPress}
  />
);