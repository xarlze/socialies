import React, { Component } from 'react'
import './Title.css'

export default class Title extends Component {
  render() {
    return (
      <div
        id="genericTitle"
      >
        {this.props.title}
      </div>
    )
  }
}
