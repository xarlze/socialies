import React, { Component } from 'react'
const messageIcon = require('../assets/messageicon.svg')

export default class RenderFriend extends Component {
  render() {
    const {id} = this.props.match.params
    const friend = this.props.friends.find(friend=>(
        friend.id == id
    ))
    return (
      <div
        className="friend"
      >
        <h3>{friend.id}</h3>
        <h1>{friend.name}</h1>
        <img
                src={messageIcon}
                onClick={e=>{
                    e.stopPropagation();
                    this.props.history.push(`/friends/${friend.id}/message`)
                }}
            />
      </div>
    )
  }
}
