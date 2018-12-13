import React from 'react';
import { connect } from 'react-redux';
import MessageList from './message-list.jsx';
import { } from '../../actions';

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
        <MessageList />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});

export default connect(
  mapStateToProps
)(BodyContainer);