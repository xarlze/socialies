import React, { Component } from 'react'
import { withRouter } from 'react-router';
import Logo from './Logo';
import Chandelier from './Chandelier'
import Register from './Register';
import Login from './Login';

class Landing extends Component {
  constructor(props){
    super(props)
    this.state={
      method:null
    }
  }
  render() {
    return (
      <React.Fragment>
      <Chandelier/>
      <Logo 
        type="main"
      />
      <div
        id="landingPage"
      >
      
        <span
            id="landingLinks"
            >
        <span
          id="loginLink"
          onClick={()=>{
            if(this.state.method=="login"){
              this.setState({
                method:null
              })
            }else{
              this.setState({
                method:"login"
              })
            }
          }}
          style={
            this.state.method=="register"?{
              opacity: "0.2"
            }:{
              opacity: "1"
            }
          }
          >Login</span>

        <span
          id="registerLink"
          onClick={()=>{
            if(this.state.method=="register"){
              this.setState({
                method:null
              })
            }else{
              this.setState({
                method:"register"
              })
            }
          }}
          style={
            this.state.method=="login"?{
              opacity: "0.2"
            }:{
              opacity: "1"
            }
          }
          >Register</span>
        </span>
        <span
            id="landingLinksReflections"
            >
        <span
          id="loginLink"
          onClick={()=>{
            if(this.state.method=="login"){
              this.setState({
                method:null
              })
            }else{
              this.setState({
                method:"login"
              })
            }
          }}
          >Login</span>

        <span
          id="registerLink"
          onClick={()=>{
            if(this.state.method=="register"){
              this.setState({
                method:null
              })
            }else{
              this.setState({
                method:"register"
              })
            }
          }}
          >Register</span>
        </span>
        {this.state.method=="register"&&<Register
          handleRegister={this.props.handleRegister}
        />}
        {this.state.method=="login"&&<Login
          handleLogin={this.props.handleLogin}
        />}
      </div>
      </React.Fragment>
    )
  }
}

export default withRouter(Landing);