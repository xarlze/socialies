import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { uploadFile } from 'react-s3';
import './Register.css'

const accessKeyId=process.env.REACT_APP_AWSAccessKeyId;
const secretAccessKey=process.env.REACT_APP_AWSSecretKey;
const bucketName="xarlze";
const dirName = "socialies";
const region = "us-east-1";

class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      file:null,
      picture_url:null,
      authFormData: {
        email: "",
        password: "",
        picture_url: ""
      }
    }
    this.upload=this.upload.bind(this);
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
  upload(e){
    const file = e.target.files[0];
    const config = {
      bucketName,
      dirName,
      region,
      accessKeyId,
      secretAccessKey
    }
    uploadFile(file, config)
      .then(data =>{
         this.setState(prev=>({
           authFormData:{
             ...prev.authFormData,
             picture_url:data.location
           }
         }))
        })
      .catch(err => console.error(err))
  }
  render() {
    return (
      <form
        id="registerForm"
        onSubmit={e=>{
          e.preventDefault();
          this.props.handleRegister(this.state.authFormData);
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

            <input
              id="file"
              name="file"
              type="file"
              onChange={e=>{
                this.upload(e)
              }}
            />
            <label
              for="file"
              id="pictureUpload"
              >
              {!this.state.authFormData.picture_url&&<p>Upload</p>}
              <img
                id="profilePic"
                src={this.state.authFormData.picture_url||"https://imgur.com/ugaHSYk.png"}
              />
              <br/>
              </label>
              
            <button
              id="submitRegister"
            >Enter</button>
      </form>
    )
  }
}

export default withRouter(Register);