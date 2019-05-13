import React, { Component } from 'react'
import { withRouter } from 'react-router';
import Loading from './Loading';
import Title from './Title';
import BackButton from './BackButton';
const deleteIcon = require('../assets/delete.svg')
const messageIcon = require('../assets/messageicon.svg')

class RenderFriend extends Component {
  render() {
    if(!this.props.friends.length){
      return(<Loading />)
    }else{
      const {id} = this.props.match.params
      const friend = this.props.friends.find(friend=>(
          friend.id == id
      ))
      return (
        <React.Fragment>
        <Title title="Friend"/>
        <div
          id="profileContainer"
        >
            <img
              id="profileImage"
              src={friend.picture_url||"https://imgur.com/ugaHSYk.png"}
            />
                
              <div
                  id="profileFirst"
              >{friend.first_name||"First"}</div>
              <div
                  id="profileLast"
              >{friend.last_name||"Last"}
              </div>
              <div
                  id="profileEmail"
              >{friend.email||"Email"}</div>
              <div
                  id="profileDescription"
              >{friend.description||"Description"}</div>

              <div
                  id="friendGender"
                  name="gender"
                  value={friend.gender}
              >
                  {friend.gender||"Unspecified"}
              </div>
              
              <button
                  id="logoutButton"
                  onClick={async (e)=>{
                    e.preventDefault()
                    this.props.removeFriendship(friend.room_id)
                    this.props.history.push('/friends');
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
                    this.props.history.push(`/friends/${friend.id}/message/${friend.room_id}`)
                }}
              >
              <img
                id="messageFriendIcon"
                src={messageIcon}
              />
              </button>
        </div>
        <BackButton/>
        </React.Fragment>
      )
    }
  }
}
export default withRouter(RenderFriend);