import React, { Component } from 'react'

import axios from 'axios';

class Question extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            question: '',
            answerTrue: 0,
            answerFalse: 0,
            answered: false,
            newQuestion: true,
        };

        this.have = id => {
            this.setState({answered: true, newQuestion: false})
            console.log("have")
            const url = `/api/v1/questions/vote-true/${id}`
            axios.post(url)
                .then(res => console.log(res))
                .then(() => this.calculateAnswers())
                .catch(err => console.log(err))
        }

        this.never = id => {
            this.setState({answered: true, newQuestion: false})
            console.log("never")
            const url = `/api/v1/questions/vote-false/${id}`
            axios.post(url)
                .then(res => console.log(res))
                .then(() => this.calculateAnswers())
                .catch(err => console.log(err))
        }

            // this.have = () => {
            //     console.log("Have")
            // }
            // this.never = () => {
            //     console.log("Never")
            // }


        this.getQuestion = () => {
            axios.get('/api/v1/questions/')
            .then(res => {
                console.log(res)
                this.setState({
                    id: res.data._id, 
                    question: res.data.question, 
                    answerTrue: res.data.answerTrue,
                    answerFalse: res.data.answerFalse,
                    answered: false,
                    newQuestion: true 
                })
            })
        }

        this.calculateAnswers = () => {
            const { answerTrue, answerFalse} = this.state
            const percentHave = parseInt((answerFalse / answerTrue) * 100)
            const percentNever = 100 - percentHave
            console.log("Have:" + percentHave + "Never" + percentNever)
            this.setState({
                answerTrue: percentHave,
                answerFalse: percentNever
            })
        }

        
    }

    componentDidMount() {
        console.log("did mount")
        this.getQuestion()

    }
    


    render(){
        return(
            <div className="row">
            <div className="col-md-2 "></div>
            <div className="col-md-8">
                <div className="question-peek">
                    <span className="question"> Never Have I Ever {this.state.question}</span>
                    <div className="answer-buttons">
                      <button className="answer-1 shadow rounded" onClick={this.have.bind(this, this.state.id)}>
                      <span className="text-centering">
                            {
                                this.state.newQuestion && <span className="text-centering"> I HAVE </span>
                            }
                            {
                                !this.state.newQuestion && this.state.answerTrue
                            }
                      </span>
                      </button>
                      <button className="answer-2 shadow rounded" onClick={this.never.bind(this, this.state.id)}>
                      <span className="text-centering">
                            {
                                this.state.newQuestion && <span className="text-centering"> I NEVER </span>
                            }
                            {
                                !this.state.newQuestion && this.state.answerFalse
                            }
                      </span>
                      </button>
                    </div>
                    <span className="author"> Author</span>
                </div>
            </div>
          <div className="col-md-2 "></div>
            </div>   
        )
    }


    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.state.answered !== false){
        console.log("did update")
        setTimeout(() => {
            this.getQuestion()
        }, 3000)
        }
    }
}

export default Question