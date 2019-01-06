import React from 'react';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }
  render() {
    return <input
      className='input'
      type='text'
      ref={this.inputRef}
      value={this.props.text}
      onChange={this.props.onChange}
      onKeyDown={this.props.onEnterPress}
      onFocus={this.onFocus}
    />;
  }

  onFocus = () => {
    this.inputRef.current.scrollIntoView({ behavior: 'smooth' });
  }
}