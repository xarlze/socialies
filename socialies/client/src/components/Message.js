import React, { Component } from 'react'
import './Message.css'
const placeholderPic = "https://imgur.com/ugaHSYk.png";
// message.parts[0].payload.content

const messages = [{
  parts:[{payload:{content:"hi"}}],
  senderId:1,
  createdAt: "2019-05-09T04:36:43Z"
},{
  parts:[{payload:{content:"bye"}}],
  senderId:5,
  createdAt: "2019-05-09T04:36:43Z"
},{
  parts:[{payload:{content:"how are you i am doing great what about you i am fine"}}],
  senderId:1,
  createdAt: "2019-05-09T04:36:43Z"
},{
  parts:[{payload:{content:"good"}}],
  senderId:5,
  createdAt: "2019-05-09T04:36:43Z"
},{
  parts:[{payload:{content:"hi"}}],
  senderId:1,
  createdAt: "2019-05-09T04:36:43Z"
},{
  parts:[{payload:{content:"bye"}}],
  senderId:5,
  createdAt: "2019-05-09T04:36:43Z"
},{
  parts:[{payload:{content:"how are you i am doing great what about you i am fine"}}],
  senderId:1,
  createdAt: "2019-05-09T04:36:43Z"
},{
  parts:[{payload:{content:"good"}}],
  senderId:5,
  createdAt: "2019-05-09T04:36:43Z"
},{
  parts:[{payload:{content:"hi"}}],
  senderId:1,
  createdAt: "2019-05-09T04:36:43Z"
},{
  parts:[{payload:{content:"bye"}}],
  senderId:5,
  createdAt: "2019-05-09T04:36:43Z"
},{
  parts:[{payload:{content:"how are you i am doing great what about you i am fine"}}],
  senderId:1,
  createdAt: "2019-05-09T04:36:43Z"
},{
  parts:[{payload:{content:"good"}}],
  senderId:5,
  createdAt: "2019-05-09T04:36:43Z"
},{
  parts:[{payload:{content:"hi"}}],
  senderId:1,
  createdAt: "2019-05-09T04:36:43Z"
},{
  parts:[{payload:{content:"bye"}}],
  senderId:5,
  createdAt: "2019-05-09T04:36:43Z"
},{
  parts:[{payload:{content:"how are you i am doing great what about you i am fine"}}],
  senderId:1,
  createdAt: "2019-05-09T04:36:43Z"
},{
  parts:[{payload:{content:"good"}}],
  senderId:5,
  createdAt: "2019-05-09T04:36:43Z"
}]
const me = {
  id: 1,
  name: "John Cena",
  picture_url:"https://randomuser.me/api/portraits/men/22.jpg"
}

export default class Message extends Component {
  constructor(props){
    super(props)
    this.state={
      messages:[],
      input:""
    }
    this.conversation = React.createRef();
    this.handleChange=this.handleChange.bind(this);
    this.scroll=this.scroll.bind(this);
    this.sendMessage=this.sendMessage.bind(this);
  }
  componentWillMount(){
    this.setState({
      messages
    })
  }
  componentDidMount(){
    this.scroll()
  }
  
  scroll(){
    this.conversation.current.scrollTop = this.conversation.current.scrollHeight
  }
  sendMessage(){
    console.log(`sending ${this.state.input}`)
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
    const {friend_id} = this.props.match.params
    console.log(this.props.match.params)
    const friend = this.props.friends.find(friend=>(
        friend.id == friend_id
    ))
    const my_id = me.id;
    const my_picture = me.picture_url;
    const my_name = me.name;
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
            >{friend.name}</h3>
            
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
