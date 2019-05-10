import React, { Component } from 'react'
import { withRouter } from 'react-router';

const plusIcon = require('../assets/plus.png')
const placeholderPic = "https://imgur.com/ugaHSYk.png";

class BrowseUsers extends Component {
    constructor(props){
        super(props)
        this.state={
            users:[]
        }
    }
    componentWillMount(){
        const {users} = this.props
        this.setState({
          users
        })
    }
    render() {
        const friendsDisplay = this.state.users.map(friend=>{
          if(friend.id!=this.props.myid){
            return(
              <div
                  className="friend"
                  onClick={()=>{
                      this.props.history.push(`/browse/${friend.id}`)
                  }}
              >
                  <img
                    className="friendPic"
                    src={friend.picture_url||placeholderPic}
                  />
                  <h1>{friend.first_name}</h1>
                  <img
                      className="messageIcon"
                      src={plusIcon}
                      onClick={e=>{
                          e.stopPropagation();
                          
                      }}
                  />
              </div>
          )}})
        return (
          <div
            className="allFriends"
          >
            <div
              id="allFriendsTitle"
            >
            <h1>All Users</h1>
            </div>
            {friendsDisplay}
            <div
              id="addFriendsLink"
              onClick={e=>{
                e.stopPropagation();
                this.props.history.push(`/friends`)
              }}
            >
            <h1>Back</h1>
            </div>
          </div>
        )
      }
}
export default withRouter(BrowseUsers);