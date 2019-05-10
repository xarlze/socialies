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
import Message from './components/Message';
import BrowseUsers from './components/BrowseUsers';
import TenSecondsRule from './components/TenSecondsRule';
import {
  loginUser,
  registerUser,
  getDetail
} from './services/api-helper'
import {
  friends,
  messages
} from './data'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      friends:[],
      messages:[],
      authenticated:false,
      credentials:{},
      user:{}
    }
    this.logout=this.logout.bind(this);
    this.handleRegister=this.handleRegister.bind(this);
    this.handleLogin=this.handleLogin.bind(this);
    this.checkUser=this.checkUser.bind(this);
    this.fetchDetails=this.fetchDetails.bind(this);
  }

  componentDidMount(){
    this.checkUser();
  }

  async fetchDetails(id){
    try{
      const user = await getDetail(id);
      this.setState({
        user
      })
    }catch(e){
      console.error(e)
    }
  }

  checkUser(user){
    try{
      const checkUser = localStorage.getItem("jwt");
      if(checkUser){
        const user = decode(checkUser);
        this.setState({
          authenticated:true,
          credentials: user
        })
        this.fetchDetails(user.user_id)
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
  async handleRegister(data){
    try{
    await registerUser(data);
    this.handleLogin(data)
      .then(()=>{
        this.props.history.push('/profile')
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
    console.log("change profile")
  }
  render(){
    return (
      <div className="App">
        
        <br/>
        <button
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
        </button>  
        {this.state.authenticated&&<Nav
          logout={this.logout}
          user={this.state.user}
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
                    user={this.state.user}
                    logout={this.logout}
                    handleProfileChange={this.handleProfileChange}
                />}
            />
            <Route
            exact path='/friends'
            render={ ( props ) => 
              <Friends
                  { ...props }
                  friends={friends}
              />}
            />
            <Route
              exact path='/friends/:id'
              render={ ( props ) => 
                <RenderFriend
                    { ...props }
                    friends={friends}
                />}
            />
            <Route
              path='/friends/:friend_id/message'
              render={ ( props ) => 
                <Message
                    { ...props }
                    friends={friends}
                />}
            />
            <Route
              path='/browse'
              render={ ( props ) => 
                <BrowseUsers
                    { ...props }
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