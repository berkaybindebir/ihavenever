import React, { Component } from 'react'

import axios from 'axios';

class Question extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            question: '',
            answerTrue: '',
            answerFalse: '',
            answered: false
        };

        this.have = this.have.bind(this);
        this.never = this.never.bind(this);
    }

    calculateAnswers() {
        console.log(this.state.answerTrue)
        console.log(this.state.answerFalse)
    }

    componentDidMount() {
        console.log("did mount")
        axios.get('/api/v1/questions/')
            .then(res => {
                console.log(res)
                this.setState({
                    id: res.data._id, 
                    question: res.data.question, 
                    answerTrue: res.data.answerTrue,
                    answerFalse: res.data.answerFalse,
                    answered: false, 
                })
            })
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.answered === true){
            console.log("update")
            this.calculateAnswers()
            setTimeout(() => {
                axios.get('/api/v1/questions/')
                .then(res => {
                    console.log(res)
                    this.setState({id: res.data._id, question: res.data.question, answered: false})
                }, (2000))
            })
        }
    }



    have(id){
        return () => {
            const url = `/api/v1/questions/vote-true/${id}`
            this.setState({answered: true})
            axios.post(url)
                .then(res => console.log(res))
                .catch(err => console.log(err))
        }
    }

    never(id){
        return () => {
            this.setState({answered: true})
            const url = `/api/v1/questions/vote-false/${id}`
            axios.post(url)
                .then(res => console.log(res))
                .catch(err => console.log(err))
        }
    }

    // have = e => {
    //     console.log("Have")
    // }


    // never = e => {
    //     console.log("Never")
    // }

    render(){
        return(
            <div className="row">
            <div className="col-md-2 "></div>
            <div className="col-md-8">
                <div className="question-peek">
                    <span className="question"> Never Have I Ever {this.state.question}</span>
                    <div className="answer-buttons">
                      <button className="answer-1 shadow rounded" onClick={this.have(this.state.id)}><span>I HAVE</span></button>
                      <button className="answer-2 shadow rounded" onClick={this.never(this.state.id)}><span>I NEVER</span></button>
                    </div>
                    <span className="author"> Author</span>
                </div>
            </div>
          <div className="col-md-2 "></div>
            </div>   
        )
    }
}

export default Question