import React, { Component } from 'react'
import { withRouter } from 'react-router';
const deleteIcon = require('../assets/delete.svg')
const messageIcon = require('../assets/messageicon.svg')

class RenderFriend extends Component {
  constructor(props){
    super(props)
    this.state={
      profile:{
        email:"",
        first_name:"",
        last_name:"",
        gender:"",
        description:"",
        picture_url:"",
        location:""
      }
    }
  }
  componentWillMount(){
    const {id} = this.props.match.params
    const friend = this.props.friends.find(friend=>(
        friend.id == id
    ))
    this.setState({
      profile:friend
    })
  }
  render() {
    return (
      <div
        id="profileContainer"
      >
          <img
            id="profileImage"
            src={this.state.profile.picture_url||"https://imgur.com/ugaHSYk.png"}
          />
              
            <div
                id="profileFirst"
            >{this.state.profile.first_name||"First"}</div>
            <div
                id="profileLast"
            >{this.state.profile.last_name||"Last"}
            </div>
            <div
                id="profileEmail"
            >{this.state.profile.email||"Email"}</div>
            <div
                id="profileDescription"
            >{this.state.profile.description||"Description"}</div>

            <div
                id="friendGender"
                name="gender"
                value={this.state.profile.gender}
                onChange={this.handleChange}
            >
                {this.state.profile.gender||"Unspecified"}
            </div>
            
            <button
                id="logoutButton"
                onClick={async (e)=>{
                  e.preventDefault()
                  this.props.removeFriendship(this.state.profile.room_id)
                  this.props.history.push('/');
                }}
            >
            <img
              id="deleteFriendIcon"
              src={deleteIcon}
            />
            </button>
            <button
                id="profileSave"
                onClick={e=>{
                  e.stopPropagation();
                  this.props.history.push(`/friends/${this.state.profile.id}/message/${this.state.profile.room_id}`)
              }}
            >
            <img
              id="messageFriendIcon"
              src={messageIcon}
            />
            </button>
      </div>
    )
  }
}
export default withRouter(RenderFriend);