import React, { Component } from 'react'
const instance = "v1:us1:b75ea194-7bec-4960-93bc-3eae48ee242b";
const secretKey = "2fdf2df2-66f4-467b-b9d5-1e356ba5e03a:YMKA0LoRLiyfV+jebHTgA75TE4cWDQGPdS6Ek3xdrkM=";
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'

export default class FriendChat extends Component {
    constructor(props){
        super(props)
        this.state={
            chatManager:null
        }
    }
    componentDidMount(){
        console.log(this.props);
    }
    render() {
        return (
        <div>
            
        </div>
        )
    }
}
