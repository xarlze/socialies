import React, { Component } from 'react'
import Loading from './Loading';
import BackButton from './BackButton';
export default class Game extends Component {
  render() {
    return (
      <React.Fragment>
        <Loading/>
        <BackButton/>
      </React.Fragment>
    )
  }
}
