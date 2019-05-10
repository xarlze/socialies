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
        return (
        <form
            id="profileContainer"
            onSubmit={(e)=>{
                e.preventDefault();
                this.props.handleProfileChange(this.state.profile);
            }}
        >
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
              id="profilePictureUpload"
              >
              <img
                id="profileImage"
                src={this.state.profile.picture_url||"https://imgur.com/ugaHSYk.png"}
              />
              <br/>
            </label>
            <input
                id="profileFirst"
                name="first_name"
                placeholder="first name"
                value={this.state.profile.first_name}
                onChange={this.handleChange}
            />
            <input
                id="profileLast"
                name="last_name"
                placeholder="last name"
                value={this.state.profile.last_name}
                onChange={this.handleChange}
            />
            <input
                id="profileEmail"
                name="email"
                placeholder="email"
                value={this.state.profile.email}
                onChange={this.handleChange}
            />
            <textarea
                id="profileDescription"
                name="description"
                placeholder="description"
                value={this.state.profile.description}
                onChange={this.handleChange}
            />
            <select
                id="profileGender"
                name="gender"
                value={this.state.profile.gender}
                onChange={this.handleChange}
            >
                <option
                    id="genderPlaceholder"
                    value=""
                >Gender</option>
                <option
                    value="Female"
                >Female</option>
                <option
                    value="Male"
                >Male</option>
                <option
                    value="Other"
                >Other</option>
            </select>
            <button
                type="button"
                id="logoutButton"
                onClick={this.props.logout}
            >Logout</button>
            <button
                id="profileSave"
            >Save</button>
        </form>
        )
    }
}
