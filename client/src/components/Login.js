import React, { Component } from 'react'
import { withRouter } from 'react-router';

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      file:null,
      picture_url:null,
      authFormData: {
        email: "",
        password: ""
      },
      invalid:false
    }
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      authFormData: {
        ...prevState.authFormData,
        [name]: value
      },
      invalid:false
    }));
  }
  async handleSubmit(e){
    e.preventDefault();
    const response = await this.props.handleLogin(this.state.authFormData)
    if(!response){
      this.setState({
      invalid:true
      })
    }
  }
  render() {
    return (
      <form
        id="registerForm"
        onSubmit={this.handleSubmit} 
      >
            {this.state.invalid&&<p
              id="inValidCredentials"
            >Invalid Credentials</p>}
            <label
              className="inputLabel"
            >
              <input 
                name="email"
                type="text"
                placeholder="EMAIL"
                value={this.state.authFormData.email}
                onChange={this.handleChange} />

            </label>

            <label
              className="inputLabel"
              id="password"
            >
              <input 
                name="password"
                type="password"
                placeholder="PASSWORD"
                value={this.state.authFormData.password}
                onChange={this.handleChange} />

            </label>
              
            <button
              id="submitRegister"
            >Enter</button>
      </form>
    )
  }
}

export default withRouter(Login);