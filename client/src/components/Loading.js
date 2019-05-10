import React, { Component } from 'react'

export default class Loading extends Component {
    constructor(props){
        super(props)
        this.state= {
            display:"Loading"
        }
    }
    componentDidMount(){
        setInterval(()=>{
            this.setState(prevState=>{
                if(prevState.display.length<10){
                    return{
                        display: prevState.display+'.'
                    }
                }else{
                    return{
                        display: 'Loading'
                    }
                }
            })
        },400)
    }
    render() {
        return (
        <div>
            <h1>{this.state.display}</h1>
        </div>
        )
    }
}
