import React, { Component } from 'react'
import './Footer.css';

export default class Footer extends Component {
    constructor(props){
        super(props)
        this.state = {
            blink: false
        }
    }
    componentDidMount(){
        setInterval(function(){
            this.setState({
                blink: true
            })
            setTimeout(() => {
                this.setState({
                    blink: false
                })
                setTimeout(() => {
                    this.setState({
                        blink: true
                    })
                    setTimeout(() => {
                        this.setState({
                            blink: false
                        })
                    }, 100);
                }, 100);
            }, 100);
        }.bind(this), 3044);
    }
  render() {
    return (    
            <a href="https://github.com/xarlze">
                <div 
                    id="char"
                    className= {this.state.blink?"blink":"none"}
                >
                </div>
            </a>
    )
  }
}
