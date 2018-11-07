import React from 'react';
import { connect } from 'react-redux';

class Input extends React.Component {
  render() {
    return (
      <div>
        {/* <Emoji />
        <Input /> */}
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
)(Input);