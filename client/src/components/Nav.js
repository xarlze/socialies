import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Logo from './Logo';
import './Nav.css';
import Loading from './Loading';
const placeholderPic = "https://imgur.com/ugaHSYk.png";

class Nav extends Component {
  render() {
    if(this.props.user.id){
      return (
        <nav>
          <button
              onClick={()=>{
                this.props.history.push('/friends')
                window.location.reload();
              }}
              id="friendsLink"
            >Friends</button>
            <Logo 
              type="nav"
              />
            <button
              onClick={()=>{
                this.props.history.push('/profile')
              }}
              id="profileLink"
            >
          {(this.props.user.first_name&&this.props.user.last_name&&this.props.user.first_name.concat(' ',this.props.user.last_name))||"Me"}
            </button>
            
        </nav>
      )
    }else{
      return(
      <Loading />
      )
    }
  }
}
export default withRouter(Nav);