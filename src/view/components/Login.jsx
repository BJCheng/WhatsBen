import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>Log in</div>
    );
  }
}

const mapStateToProps = () => ({

});

export default connect(mapStateToProps)(Login);