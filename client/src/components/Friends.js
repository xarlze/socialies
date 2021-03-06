import React, { Component } from 'react'
import { withRouter } from 'react-router';
import './Friends.css'
const messageIcon = require('../assets/messageicon.svg')
const placeholderPic = "https://imgur.com/ugaHSYk.png";

class Friends extends Component {
  constructor(props){
    super(props)
    this.state={
      friends:[]
    }
  }
  componentWillMount(){
    this.setState({
      friends:this.props.friends
    })
  }
  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.friends!=prevState.friends){
      return{
        friends:nextProps.friends
      }
    }
  }
  render() {
    const friendsDisplay = this.state.friends.map(friend=>(
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
            <h1>{friend.first_name}</h1>
            <img
                className="messageIcon"
                src={messageIcon}
                onClick={e=>{
                    e.stopPropagation();
                    this.props.history.push(`/friends/${friend.id}/message/${friend.room_id}`)
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