import React, { Component } from 'react'
import { withRouter } from 'react-router';
import Loading from './Loading';

const plusIcon = require('../assets/plus.png')
const placeholderPic = "https://imgur.com/ugaHSYk.png";

class BrowseUsers extends Component {
    constructor(props){
        super(props)
        this.state={
            users:[],
            friends:[]
        }
        this.notAlreadyFriend=this.notAlreadyFriend.bind(this);
    }
    componentDidMount(){
        const {users,friends} = this.props
        this.setState({
          users,
          friends
        })
    }
    static getDerivedStateFromProps(nextProps, prevState){
      if(nextProps.friends!=prevState.friends){
        return{
          friends:nextProps.friends
        }
      }else{
        return(null);
      }
    }
    notAlreadyFriend(userid){
      let notFriend = true;
      this.state.friends.forEach(friend=>{
        if(friend.id==userid){
          notFriend = false;
        }
      })
      return notFriend;
    }
    render() {
      if(this.props.loading){
        return(<Loading/>)
      }else{
        const friendsDisplay = this.state.users.map(friend=>{
          if((friend.id!=this.props.myid)&&this.notAlreadyFriend(friend.id)){
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
                          this.props.addFriendship(friend.id)
                          this.props.history.push('/friends');
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
}
export default withRouter(BrowseUsers);