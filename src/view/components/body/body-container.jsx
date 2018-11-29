import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageList from './message-list.jsx';
import { } from '../../actions';

class BodyContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.dispatch();
  }

  render() {
    return (
      <div className='body-container'>
        <MessageList messages={this.props.messages} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.body.messages
});

export default connect(
  mapStateToProps
)(BodyContainer);