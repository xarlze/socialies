import React, { Component } from 'react'
import { withRouter } from 'react-router';
import './BackButton.css'
const back = require('../assets/back.svg');

class BackButton extends Component {
  render() {
    return (
      <button
        id="backButton"
        onClick={this.props.history.goBack}
      >
          <img
            id="backButtonImg"
            src={back}
          />
          <p>Back</p>
      </button>
    )
  }
}

export default withRouter(BackButton);