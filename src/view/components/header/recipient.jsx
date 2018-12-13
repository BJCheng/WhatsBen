import React from 'react';
import { connect } from 'react-redux';

class Recipient extends React.Component {
  render() {
    return (
      <div className='recipient'>
        <div>
          <span>{this.props.capitalizedName}</span>
        </div>
        <div className='timestamp'>
          <span>{this.props.dateFormatString}</span>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  const { name, lastSeen } = state.header;
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  const date = new Date(parseInt(lastSeen));
  const dateFormatString = `last seen ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  return { ...state.header, capitalizedName, dateFormatString };
};

export default connect(
  mapStateToProps
)(Recipient);