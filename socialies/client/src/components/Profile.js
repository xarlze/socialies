import React, { Component } from 'react'
import { uploadFile } from 'react-s3';
import './Profile.css'

const accessKeyId=process.env.REACT_APP_AWSAccessKeyId;
const secretAccessKey=process.env.REACT_APP_AWSSecretKey;
const bucketName="xarlze";
const dirName = "socialies";
const region = "us-east-1";

export default class Profile extends Component {
    constructor(props){
        super(props)
        this.state={
            original:{},
            profile:{
                id:"",
                email:"",
                first_name:"",
                last_name:"",
                gender:"",
                description:"",
                picture_url:"",
                location:""
            }
        }
        this.upload=this.upload.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    showPosition(position) {
        let currLat = position.coords.latitude;
        let currLong = position.coords.longitude;
        
      }
    
      getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState(prevState => ({
        profile: {
            ...prevState.profile,
            [name]: value
        }
        }));
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(prevState.original!==nextProps.user){
            return{
                original:nextProps.user,
                profile:nextProps.user
            }
        }else{
            return null
        }
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
               profile:{
                 ...prev.profile,
                 picture_url:data.location
               }
             }))
            })
          .catch(err => console.error(err))
      }
    
    render() {
        console.log(this.state.profile);
        return (
        <form
            id="profileContainer"
            onSubmit={this.props.handleProfileChange}
        >
            <input
              id="profileFile"
              name="file"
              type="file"
              onChange={e=>{
                this.upload(e)
              }}
            />
            <label
              for="profileFile"
              id="profilePictureUpload"
              >
              <p>Upload</p>
              <img
                id="profilePic"
                src={this.state.profile.picture_url||"https://imgur.com/ugaHSYk.png"}
              />
              <br/>
            </label>
            <input
                id="profileFirst"
                name="first_name"
                value={this.state.profile.first_name}
                onChange={this.handleChange}
            />
            <input
                id="profileLast"
                name="last_name"
                value={this.state.profile.last_name}
                onChange={this.handleChange}
            />
            <input
                id="profileEmail"
                name="email"
                value={this.state.profile.email}
                onChange={this.handleChange}
            />
            <textarea
                id="profileDescription"
                name="description"
                value={this.state.profile.description}
                onChange={this.handleChange}
            />
            <select
                name="gender"
                value={this.state.profile.gender}
                onChange={this.handleChange}
            >
                <option
                    value=""
                >Unspecified</option>
                <option
                    value="F"
                >Female</option>
                <option
                    value="M"
                >Male</option>
                <option
                    value="O"
                >Other</option>
            </select>

        </form>
        )
    }
}
