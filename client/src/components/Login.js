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
      }
    }
    this.handleChange=this.handleChange.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      authFormData: {
        ...prevState.authFormData,
        [name]: value
      }
    }));
  }
  render() {
    return (
      <form
        id="registerForm"
        onSubmit={e=>{
          e.preventDefault();
          this.props.handleLogin(this.state.authFormData)
        }} 
      >
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