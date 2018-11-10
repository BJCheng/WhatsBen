import React from 'react';
import { connect } from 'react-redux';
import Emoji from './emoji.jsx';
import Input from './input.jsx';
import SendButton from './send-button.jsx';
import { changeInput, sendMessage } from '../../actions';

class InputContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onEnterPress = this.onEnterPress.bind(this);
  }

  render() {
    return (
      <div>
        <Emoji click={this.props.click} />
        <Input text={this.props.text} onChange={this.props.onChange} onEnterPress={this.onEnterPress} />
      </div>
    );
  }

  onEnterPress(e) {
    if(e.key !== 'Enter') return;
    this.props.sendMessage(this.props.text);
  }
}

const mapStateToProps = (state) => ({
  text: state.input.text
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputContainer);