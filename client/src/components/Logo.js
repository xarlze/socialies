import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './Logo.css';
const logowhite = require('../assets/logowhite.svg')

class Logo extends Component {
  render() {
    return (
      <img
        id="logo"
        className={`${this.props.type}Logo`}
        onClick={()=>{
            this.props.history.push('/')
        }}
        src = {logowhite}
      />
    )
  }
}
export default withRouter(Logo);
