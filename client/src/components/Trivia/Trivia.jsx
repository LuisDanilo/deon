import React, { Component } from 'react'
import './trivia.scss'

const getAnswers = 'e1403969be9569c6'
const getQuestions = 'c7fa8ca827263bb4'

class Trivia extends Component {

  constructor(props){
    super(props)
    this.state = {
      questionId: '',
      question: '',
      options: {},
      joke: false
    }
  }

  componentDidMount() {
    fetch(`http://localhost:4000/api/${getQuestions}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          question: data.question,
          options: data.options,
          questionId: data.questionId,
          joke: data.joke
        })
      })
  }

  answer = (buttonAnswer) => {
    fetch(`http://localhost:4000/api/${getAnswers}/${this.state.questionId}`)
      .then(res => res.json())
      .then(data => {
        let answer = Object.values(data)[1]
        if (answer === buttonAnswer) {
          this.props.onAnswer(true)
        } else {
          this.props.onAnswer(false)
        }
      })
    
  }

  render() {
    let options = Object.entries(this.state.options)
    return (
      <div className="trivia-container">
        <div className="card">
          <div className="card-header">
            <h2>... Responde ...</h2>
          </div>
          <div className="card-body">
            <h2 className='h1 text-uppercase'>{this.state.question}</h2>
            <div className="options-container">
              {options.map((option) => {
                return <Button key={option[0]} onButtonClicked={this.answer} answer={option[1]} answerId={option[0]}/>
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}


class Button extends Component {
  constructor(props) {
    super(props)
  }

  onButtonClicked = () => {
    this.props.onButtonClicked(this.props.answerId)
  }

  render() {
    return(
      <button onClick={this.onButtonClicked} className='btn border border-info text-white'>
        {this.props.answer}
      </button>
    )
  }
}

export default Trivia