import React, { Component } from 'react'
import { withRouter } from 'react-router';
import './Redirect.css'

class Redirect extends Component {
    constructor(props){
        super(props)
        this.state = {
            countdown:3,
            timeout: null
        }
    }
    componentDidMount(){
        setInterval(()=>{
            this.setState(prevState=>{
                return{
                    countdown:prevState.countdown-1
                }
            })
        },1000)
        
        const timeout = setTimeout(()=>{
            this.props.history.push('/')
            window.location.reload()
        },3000)

        this.setState({
            timeout
        })
    }
    componentWillUnmount(){
        clearTimeout(this.state.timeout)
    }
    render() {
        return (
        <div
            id="redirect"
        >
            <p
                id="redirectCountdown"
            >Redirecting in {this.state.countdown}</p>
            <p
                id="redirectText"
            >Please log in to view this page</p>
        </div>
        )
    }
}
export default withRouter(Redirect)
