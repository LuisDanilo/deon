import React, {Component} from 'react'
import './card.scss'
import Trivia from '../Trivia/Trivia'

class Card extends Component {

  constructor(props) {
    super(props)
    this.state = {
      front: true
    }
    // ANIMACIONES
    // Volteo tarjeta hacia su parte trasera
    this.flipToBack = [
      {transform: 'rotateY(180deg)'}
    ]
    this.flipToBackOptions = {
      duration: 1000,
      easing: 'ease',
      fill: 'forwards'
    }
    // Volteo tarjeta hacia su parte frontal
    this.flipToFront = [
      {transform: 'rotateY(0deg)'}
    ]
    this.flipToFrontOptions = {
      duration: 1000,
      easing: 'ease',
      fill: 'forwards'
    }
    // Esconder contenedor (y por tanto la tarjeta en si)
    this.hideCardContainer = [
      {opacity: 1, visibility: 'visible'},
      {opacity: 0, visibility: 'hidden'}
    ]
    this.hideCardContainerOptions = {
      duration: 500,
      delay: this.flipToFrontOptions.duration,
      easing: 'ease-out',
      fill: 'forwards'
    }
  }

  flipCard = () => {
    this.card.classList.toggle('bg')
    if (this.state.front) {
      //console.log('Estoy frontal, paso a trasera')
      this.cardContainer.animate(this.flipToBack, this.flipToBackOptions)
      this.setState({front: false})
      this.props.onFlipToBack(this.props.cardIndex)
    } else {
      //console.log('Estoy trasera, paso a ocultarme')
      this.cardContainer.animate(this.flipToFront, this.flipToFrontOptions)
      this.cardContainer.animate(this.hideCardContainer, this.hideCardContainerOptions)
      this.props.onFlipToFront()
    }
  }

  answer = () => {
    this.props.onAnswerCorrect()
  }

  render() {
    return (
      <>
        <div className="card-container" onClick={this.flipCard} ref={element => this.cardContainer = element}>
          <div className="card bg" ref={element => this.card = element}>
            {!this.state.front && <Trivia onAnswer={this.answer}/> }
          </div>
        </div>
      </>
    )
  }
}

export default Card