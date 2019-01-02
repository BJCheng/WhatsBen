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
    return (
      <div className='body-container'>
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