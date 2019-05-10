import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import './style.css';
import Loading from './components/Loading';
import Profile from './components/Profile';
import decode from 'jwt-decode';
import Nav from './components/Nav';
import Landing from './components/Landing';
import Home from './components/Home';
import Friends from './components/Friends';
import RenderFriend from './components/RenderFriend';
import RenderUser from './components/RenderUser';
import Message from './components/Message';
import BrowseUsers from './components/BrowseUsers';
import TenSecondsRule from './components/TenSecondsRule';
import {
  loginUser,
  registerUser,
  getDetail,
  putUser,
  getUsers,
  getFriends,
  postFriendship,
  deleteFriendship
} from './services/api-helper'
import {
  friends,
  messages
} from './data'
import Chatkit from '@pusher/chatkit-server';

const instanceLocator = process.env.REACT_APP_CHATKIT_INSTANCE;
const key = process.env.REACT_APP_CHATKIT_SECRET_KEY

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      friendships:[],
      friends:[],
      messages:[],
      authenticated:false,
      credentials:{},
      users:[]
    }
    this.logout=this.logout.bind(this);
    this.handleRegister=this.handleRegister.bind(this);
    this.handleLogin=this.handleLogin.bind(this);
    this.checkUser=this.checkUser.bind(this);
    this.handleProfileChange=this.handleProfileChange.bind(this);
    this.getFriendships=this.getFriendships.bind(this);
    this.getAllUsers=this.getAllUsers.bind(this);
    this.deriveFriends=this.deriveFriends.bind(this);
    this.createChatUser=this.createChatUser.bind(this);
    this.addFriendship=this.addFriendship.bind(this);
    this.createRoom=this.createRoom.bind(this);
    this.removeFriendship=this.removeFriendship.bind(this);
  }

  async componentDidMount(){
    await this.getAllUsers();
    await this.checkUser();
  }

  async createChatUser(id,name){
    const chatkit = new Chatkit({
      instanceLocator,
      key
    })
    chatkit.createUser({
      id:`${id}`,
      name,
    })
      .then(resp => {
        console.log(resp);
      }).catch((err) => {
        console.log(err);
      });
  }

  async createRoom(myid,friendid){
    try{
      const chatkit = new Chatkit({
        instanceLocator,
        key
      })
      return await chatkit.createRoom({
        creatorId: `${myid}`,
        name: `Room With ${myid} and ${friendid}`,
        userIds: [`${friendid}`],
        isPrivate: true
      })
        .then(resp => {
          console.log(resp);
          return resp.id;
        })
    }catch(e){
      console.error(e);
    }
  }
  async getAllUsers(){
    const users = await getUsers();
    this.setState({
        users
    })
  }

  async checkUser(){
    try{
      const checkUser = localStorage.getItem("jwt");
      if(checkUser){
        const user = decode(checkUser);
        this.setState({
          authenticated:true,
          credentials: user
        })
        const friends = await this.getFriendships(user.user_id)
        return { user, friends }
      }
    }catch(e){
      console.error(e)
    }
  }

  logout(){
    localStorage.clear();
    this.props.history.push('/');
    window.location.reload();
  }

  async getFriendships(id){
    try{
      const {friends} = await getFriends(id);
      this.setState({
        friendships:friends
      })
      return this.deriveFriends();
    }catch(e){
      console.error(e)
    }
  }

  async addFriendship(id){
    try{
      const room_id = await this.createRoom(this.state.credentials.user_id,id)
      console.log("added room "+room_id);
      const friendship = await postFriendship({
        user_id:this.state.credentials.user_id,
        friend_user_id:id,
        room_id
      })
      this.setState(prevState=>({
        friendships:[...prevState.friendships, friendship]
      }))
      this.deriveFriends();
    }catch(e){
      console.error(e)
    }
  }

  async removeFriendship(roomid){
    await deleteFriendship(roomid);
    const newFriends = this.state.friends.filter(friend=>{
      if(friend.room_id==roomid){
        return false
      }
      return true
    })
    this.setState({
      friends:newFriends
    })
    await this.getFriendships(this.state.credentials.user_id);
  }

  deriveFriends(){
    const myid = this.state.credentials.user_id;
    const friendObjs = this.state.friendships.map(friendship=>{
      if(friendship.friend_user_id==myid){
        return {
          id:friendship.user_id,
          room_id:friendship.room_id
        }
      }else{
        return{
          id:friendship.friend_user_id,
          room_id:friendship.room_id
        }
      }
    })
    const friends = []
    this.state.users.forEach(user=>{
      let isFriend = false;
      let room_id = null;
      friendObjs.forEach(friendObj=>{
        if(friendObj.id==user.id){
          isFriend = true;
          room_id = friendObj.room_id;
        }
      })
      if(isFriend){
        friends.push({
          ...user,
          room_id
        })
      }
    })
    this.setState({
      friends
    })
    return friends;
  }

  async handleRegister(data){
    try{
    await registerUser(data);
    this.handleLogin(data)
      .then(()=>{
        this.props.history.push('/profile')
        this.createChatUser(this.state.credentials.user_id, `User ${this.state.credentials.user_id}`);
      })
    }catch(e){
      console.error(e)
    }
  }

  async handleLogin(data){
    try{
      const response = await loginUser(data);
      localStorage.setItem('jwt',response.token)
      this.checkUser()
    }catch(e){
      console.error(e)
    }
  }

  async handleProfileChange(data){
    try{
      const user = await putUser(this.state.credentials.user_id,data);
      this.setState({
        credentials:user
      })
    }catch(e){
      console.error(e)
    }
  }

  render(){
    return (
      <div className="App">
        <br/>
        {/* <button
          onClick={()=>{
            this.setState(prevState=>({
              authenticated:!prevState.authenticated
            }))
          }}
          style={{
            position:"fixed",
            bottom: "1%"
          }}
        >
          Sign
        </button>   */}
        {this.state.authenticated&&<Nav
          logout={this.logout}
          user={this.state.credentials}
        />}
        <Switch>
        {this.state.authenticated&&(
          <React.Fragment>
            <Route
              exact path="/"
              component={ ( props ) => 
                <Home
                    { ...props }
                    logout={this.logout}
                />}
            />
            <Route
              exact path='/profile'
              render={ ( props ) => 
                <Profile
                    { ...props }
                    user={this.state.credentials}
                    logout={this.logout}
                    handleProfileChange={this.handleProfileChange}
                />}
            />
            <Route
            exact path='/friends'
            render={ ( props ) => 
              <Friends
                  { ...props }
                  friends={this.state.friends}
              />}
            />
            <Route
              exact path='/friends/:id'
              render={ ( props ) => 
                <RenderFriend
                    { ...props }
                    friends={this.state.friends}
                    removeFriendship={this.removeFriendship}
                />}
            />
            <Route
              path='/friends/:friend_id/message/:room_id'
              render={ ( props ) => 
                <Message
                    { ...props }
                    friends={this.state.friends}
                    user={this.state.credentials}
                    checkUser={this.checkUser}
                />}
            />
            <Route
              exact path='/browse'
              render={ ( props ) => 
                <BrowseUsers
                    { ...props }
                    users={this.state.users}
                    myid={this.state.credentials.user_id}
                    addFriendship={this.addFriendship}
                />}
            />
            <Route
              path='/browse/:id'
              render={ ( props ) => 
                <RenderUser
                    { ...props }
                    users={this.state.users}
                    addFriendship={this.addFriendship}
                />}
            />
            <Route
              path='/ten-seconds-rule'
              render={ ( props ) => 
                <TenSecondsRule
                    { ...props }
                    friends={friends}
                />}
            />
          </React.Fragment>)}
          <Route
            exact path="/"
            render={ ( props ) => 
              <Landing
                  { ...props }
                  handleRegister={this.handleRegister}
                  handleLogin={this.handleLogin}
              />}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);