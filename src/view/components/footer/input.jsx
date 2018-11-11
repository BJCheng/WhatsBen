import React from 'react';

export default (props) => (
  <input
    className='input'
    type='text'
    value={props.text}
    onChange={props.onChange}
    onKeyDown={props.onEnterPress}
  />
);