import React from 'react';
import { connect } from 'react-redux';
import MessageList from './message-list.jsx';
import { fetchMessagesBetween } from '../../actions';

class BodyContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.dispatch();
  }

  render() {
    const baseImgUrl = '/build/view/images/background.png';
    const imgUrl = process.env.NODE_ENV === 'production' ? '/chat-with-ben' + baseImgUrl : baseImgUrl;
    const style = {
      background: `linear-gradient(rgba(229, 221, 213, 0.9), rgba(229, 221, 213, 0.9)), url(${imgUrl})`,
      backgroundSize: '24em',
      backgroundColor: '#E5DDD5'
    };
    return (
      <div className='body-container' style={style}>
        <MessageList {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  from: state.from,
  to: state.to,
  messages: state.messages
});

const mapDispatchToProps = (dispatch) => ({
  fetchMessages: () => {
    dispatch(fetchMessagesBetween);
  }
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(BodyContainer);