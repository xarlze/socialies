import React, { Component } from 'react'
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import './Message.css'
const placeholderPic = "https://imgur.com/ugaHSYk.png";
const instanceLocator = process.env.REACT_APP_CHATKIT_INSTANCE;
const url = process.env.REACT_APP_CHATKIT_TOKEN_URL;
// message.parts[0].payload.content

export default class Message extends Component {
  constructor(props){
    super(props)
    this.state={
      currentUser:null,
      messages:[],
      friend:{
        email:"",
        first_name:"",
        last_name:"",
        gender:"",
        description:"",
        picture_url:"",
        location:""
      },
      input:""
    }
    this.conversation = React.createRef();
    this.handleChange=this.handleChange.bind(this);
    this.scroll=this.scroll.bind(this);
    this.sendMessage=this.sendMessage.bind(this);
    this.connect=this.connect.bind(this);
  }
  connect(){
    const chatManager = new ChatManager({
      instanceLocator,
      userId: `${this.props.user.id}`,
      tokenProvider: new TokenProvider({ url })
    })
    chatManager.connect()
    .then(currentUser => {
      this.setState({
        currentUser
      })
      currentUser.subscribeToRoomMultipart({
        roomId: `${this.props.match.params.room_id}`,
        hooks: {
          onMessage: message => {
            this.setState(prev=>{
              return{
                messages:[
                  ...prev.messages,
                  message
                ]
              }
            })
          }
        },
        messageLimit: 30
      }) 
    })
  }
  componentWillMount(){
    this.setState({
      messages:[{
        parts:[{payload:{content:"Start Chatting!"}}],
        senderId:`${this.props.user.id}`,
        createdAt: "0000-01-01T00:00:00Z"
      }]
    })
  }
  componentDidMount(){
    const {friend_id} = this.props.match.params
    // const { user, friends} = this.props.checkUser();

    const friend = this.props.friends.find(friend=>(
        friend.id == friend_id
    ))
    this.setState({
      friend
    })
    this.scroll();
    this.connect();
  }
  
  scroll(){
    this.conversation.current.scrollTop = this.conversation.current.scrollHeight
  }
  sendMessage(){
    this.state.currentUser.sendSimpleMessage({
      roomId: `${this.props.match.params.room_id}`,
      text: `${this.state.input}`,
    })
    .catch(err => {
      console.error(err);
    })
    this.setState({
      input:""
    })
  }

  readableTime(time){
    let date = new Date(time);
    return (<div className="time">{`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}<br/>{`${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`}</div>)
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const {friend} = this.state;
    const my_id = this.props.user.id;
    const my_picture = this.props.user.picture_url;
    const my_name = this.props.user.first_name||"Me";
    const messagesDisplay = this.state.messages.map(message=>(
      <div
        className="conversationLog"
      >
        {message.senderId==my_id?(
          <React.Fragment>
          <div
            className="holdsSpace"
          ></div>
          <p
            className="myMessage"
          >{message.parts[0].payload.content}</p>
          <div
            className="messageProfile"
          >
            <img
              className="chatIcon"
              src={my_picture||placeholderPic}
            />
            <h3
              className="chatName"
            >{my_name}</h3>
            
          </div>
          </React.Fragment>):(
          <React.Fragment>
          <div
            className="messageProfile"
          >
            <img
              className="chatIcon"
              src={friend.picture_url||placeholderPic}
            />
            <h3
              className="chatName"
            >{friend.first_name||"Friend"}</h3>
            
          </div>
          <p
          className="friendMessage">
          {message.parts[0].payload.content}</p>
          <div
            className="holdsSpace"
          ></div>
          </React.Fragment>)}
          {this.readableTime(message.createdAt)}
        </div>)
    );
    return (
      <React.Fragment>
        <div
          id="conversationContainer"
          ref={this.conversation}
        >
          {messagesDisplay}
        </div>
        <input
          id="messageInput"
          value={this.state.input}
          name="input"
          onChange={this.handleChange}
          onClick={this.scroll}
        />
        <button
          id="sendMessage"
          onClick={this.sendMessage}
        >Send</button>
      </React.Fragment>  
    )
  }
}
