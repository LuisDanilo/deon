import React, { Component } from 'react'
import './trivia.scss'

class Trivia extends Component {

  constructor(props){
    super(props)
    this.state = {
      question: '',
      options: []
    }
  }

  componentDidMount() {
    // Fetch trivia
  }

  render() {
    return (
      <div className="trivia-container">
        <p>{this.state.question}</p>
        <button className='btn border-success' onClick={this.props.onAnswer}>Nice</button>
        <button className='btn border-danger'>Bad</button>
      </div >
    )
  }
}

export default Trivia