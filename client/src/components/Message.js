import React, { Component } from 'react'
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import Title from './Title';
import './Message.css'
import Loading from './Loading';
const placeholderPic = "https://imgur.com/ugaHSYk.png";
const instanceLocator = process.env.REACT_APP_CHATKIT_INSTANCE;
const url = process.env.REACT_APP_CHATKIT_TOKEN_URL;

export default class Message extends Component {
  constructor(props){
    super(props)
    this.state={
      currentUser:null,
      messages:[{
        parts:[{payload:{content:"Start chatting!"}}],
        senderId:`${this.props.user.id}`,
        createdAt: "2000-06-29T12:00:00Z"
      }],
      loading:true,
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
        currentUser,
        loading:false
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
            this.scroll();
          }
        },
        messageLimit: 30
      }) 
    })
  }
  componentDidMount(){
    debugger;
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
    return (<div className="time">{`${date.getHours()>=10?date.getHours():'0'+date.getHours()}:${date.getMinutes()>=10?date.getMinutes():'0'+date.getMinutes()}:${date.getSeconds()>=10?date.getSeconds():'0'+date.getSeconds()}`}<br/>{`${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`}</div>)
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  
  render() {
    if(this.state.loading||!this.props.friends.length){
      return(<Loading />)
    }else{
      const {friend_id} = this.props.match.params
      const friend = this.props.friends.find(friend=>(
          friend.id == friend_id
      ))
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
          <h1
            id="messageTitle"
          >{friend.first_name}</h1>
          <div
            id="conversationContainer"
            ref={this.conversation}
          >
            {messagesDisplay}
          </div>
          <form
            onSubmit={e=>{
              e.preventDefault();
              this.sendMessage();
            }}
          >
            <input
              id="messageInput"
              value={this.state.input}
              name="input"
              onChange={this.handleChange}
              onClick={this.scroll}
            />
            <button
              id="sendMessage"
            >Send</button>
          </form>
        </React.Fragment>  
      )
    }
  }
}
