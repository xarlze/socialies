import React, { Component } from 'react'
import { withRouter } from 'react-router';
import './Menu.css'

class Menu extends Component {
  render() {
    return (
      <div
        id="mainMenu"
      >
        <button
          id="mafiaLink"
          onClick={()=>{this.props.history.push('/game')}}
        >Mafia
        </button>
        <button
          id="ucLink"
          onClick={()=>{this.props.history.push('/game')}}
        >Who is <br/>Undercover
        </button>
        <button
          id="ottLink"
          onClick={()=>{this.props.history.push('/game')}}
        >One True <br/>Three
        </button>
        <button
          id="cahLink"
          onClick={()=>{this.props.history.push('/game')}}
        >Cards Against<br/> Humanity
        </button>
        <button
          id="bsLink"
          onClick={()=>{this.props.history.push('/game')}}
        >Bullshit</button>
      </div>
    )
  }
}

export default withRouter(Menu);