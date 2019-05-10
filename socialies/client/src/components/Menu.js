import React, { Component } from 'react'
import './Menu.css'

export default class Menu extends Component {
  render() {
    return (
      <div
        id="mainMenu"
      >
        <button
          id="mafiaLink"
        >Mafia
        </button>
        <button
          id="ucLink"
        >Who is <br/>Undercover
        </button>
        <button
          id="ottLink"
        >One True <br/>Three
        </button>
        <button
          id="cahLink"
        >Cards Against<br/> Humanity
        </button>
        
        <button
          id="bsLink"
        >Bullshit</button>
      </div>
    )
  }
}
