import React from 'react';
import { connect } from 'react-redux';
import Emoji from './emoji.jsx';
import Input from './input.jsx';

class Container extends React.Component {
  render() {
    return (
      <div>
        <Emoji click={this.props.click}/>
        <Input />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, getState) => ({
  click: () => {
    dispatch({
      type: 'CLICK'
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);