import React, { Component } from 'react';
import { connect } from 'react-redux';
import Emoji from './emoji.jsx';
import Input from './input.jsx';
import SendButton from './send-button.jsx';
import { changeInput, sendMessage, clearInput } from '../../actions';

class InputContainer extends Component {
  constructor(props) {
    super(props);
    this.onEnterPress = this.onEnterPress.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  render() {
    return (
      <div className='footer-container'>
        <Emoji click={this.props.click} />
        <Input text={this.props.text} onChange={this.props.onChange} onEnterPress={this.onEnterPress} />
        <SendButton onClick={this.onClick} />
      </div>
    );
  }

  onEnterPress(e) {
    if (e.key !== 'Enter') return;
    if (this.props.text.length == 0) return;
    this.props.sendMessage(this.props.text);
  }

  onClick() {
    if (this.props.text.length == 0) return;
    this.props.sendMessage(this.props.text);
  }
}

const mapStateToProps = (state) => ({
  text: state.footer.text
});

const mapDispatchToProps = (dispatch) => {
  return {
    click: () => {
      dispatch({
        type: 'CLICK'
      });
    },
    onChange: (event) => {
      dispatch(changeInput(event.target.value));
    },
    sendMessage: (text) => {
      dispatch(sendMessage(text));
      dispatch(clearInput());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputContainer);