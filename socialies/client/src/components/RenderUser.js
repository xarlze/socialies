import React, { Component } from 'react'
const deleteIcon = require('../assets/delete.svg')
const messageIcon = require('../assets/messageicon.svg')
const plusIcon = require('../assets/plus.svg')

export default class RenderUser extends Component {
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
    const friend = this.props.users.find(friend=>(
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
                id="addFriendButton"
                onClick={e=>{
                    e.preventDefault();
                    this.props.addFriendship(this.props.match.params.id)
                    this.props.history.push('/');
                }}
            >
                <img
                id="addFriendIcon"
                src={plusIcon}
                />
            </button>
      </div>
    )
  }
}
