import React, { Component } from 'react'
import Menu from './Menu';
import './Home.css'

export default class Home extends Component {
  render() {
    return (
      <div
        id="home">
        <Menu/>
      </div>
    )
  }
}
