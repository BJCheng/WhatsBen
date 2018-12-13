import React from 'react';
import Message from './Message.jsx';
import { connect } from 'react-redux';
import { fetchMessagesBetween } from '../../actions';

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.lastMessageRef = React.createRef();
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount() {
    const { from, to } = this.props;
    this.props.fetchMessages(from.id, to.id);
    this.scrollToBottom('instant');
  }

  componentDidUpdate() {
    this.scrollToBottom('smooth');
  }

  renderMessage = (messages) => {
    return messages.map((message) => {
      message = JSON.parse(message);
      return (
        <Message {...message} />
      );
    });
  }

  render() {
    return (
      <div className='message-list'>
        {this.renderMessage(this.props.messages)}
        <div ref={this.lastMessageRef}></div>
      </div>
    );
  }

  scrollToBottom(behavior) {
    this.lastMessageRef.current.scrollIntoView({ behavior });
  }
}

const mapStateToProps = (state) => ({
  from: state.from,
  to: state.to,
  messages: state.messages
});

const mapDispatchToProps = (dispatch) => ({
  fetchMessages: (from, to) => {
    dispatch(fetchMessagesBetween(from, to));
  }
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(MessageList);