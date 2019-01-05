import React from 'react';
import { connect } from 'react-redux';
import Emoji from './emoji.jsx';
import Input from './input.jsx';
import SendButton from './send-button.jsx';
import { changeInput, appendMessage, sendMessage, clearInput } from '../../actions';

class InputContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onEnterPress = this.onEnterPress.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  render() {
    return (
      <div className='footer-container'>
        <Emoji click={this.props.click} />
        <Input
          text={this.props.text}
          onChange={this.props.onChange}
          onEnterPress={this.onEnterPress}
          onFocus={this.onFocus} />
        <SendButton onClick={this.onClick} />
      </div>
    );
  }

  onEnterPress(e) {
    if (e.key !== 'Enter') return;
    if (this.props.text.length == 0) return;
    this.props.sendMessage(this.props.from.id, this.props.to.id, this.props.text);
  }

  onClick() {
    if (this.props.text.length == 0) return;
    this.props.sendMessage(this.props.from.id, this.props.to.id, this.props.text);
  }

  onFocus() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
}

const mapStateToProps = (state) => ({
  from: state.from,
  to: state.to,
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
    sendMessage: (from, to, text) => {
      const messageObj = { from, to, text, sendTime: Date.now() };
      dispatch(sendMessage(messageObj));
      dispatch(appendMessage(messageObj));
      dispatch(clearInput());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputContainer);