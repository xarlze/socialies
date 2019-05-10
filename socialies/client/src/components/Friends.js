import React, { Component } from 'react'
import { withRouter } from 'react-router';
import './Friends.css'
const messageIcon = require('../assets/messageicon.svg')
const placeholderPic = "https://imgur.com/ugaHSYk.png";

class Friends extends Component {
  render() {
    const friendsDisplay = this.props.friends.map(friend=>(
        <div
            className="friend"
            onClick={()=>{
                this.props.history.push(`/friends/${friend.id}`)
            }}
        >
            <img
              className="friendPic"
              src={friend.picture_url||placeholderPic}
            />
            <h1>{friend.name.split(" ")[0]}</h1>
            <img
                className="messageIcon"
                src={messageIcon}
                onClick={e=>{
                    e.stopPropagation();
                    this.props.history.push(`/friends/${friend.id}/message`)
                }}
            />
        </div>
    ))
    return (
      <div
        className="allFriends"
      >
        <div
          id="allFriendsTitle"
        >
        <h1>Friends</h1>
        </div>
        {friendsDisplay}
        <div
          id="addFriendsLink"
          onClick={e=>{
            e.stopPropagation();
            this.props.history.push(`/browse`)
          }}
        >
        <h1>Add</h1>
        </div>
      </div>
    )
  }
}

export default withRouter(Friends);