import React, { Component } from 'react'
import './Loading.css'
const loadingImage = require('../assets/loading.svg')
const blackBackground = require('../assets/black.jpg')

export default class Loading extends Component {
    render() {
        return (
        <React.Fragment>
            <img
                id="loadingContainer"
                src={blackBackground}
            />
            <img
                id="loadingImage"
                src={loadingImage}
            />
        </React.Fragment>
        )
    }
}
