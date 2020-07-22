import React, {Component} from 'react'
import image from '../assets/images/interrogation.svg'

class Card extends Component {

  constructor(props) {
    super(props)
    this.state = {
      front: true
    }
  }

  toggleCard = () => {
    if (this.state.front) {
      this.card.classList.remove('flipToFront')
      this.card.classList.add('flipToBack', 'grow')
      this.setState({front: false})
      this.props.onFlipToFront()
    } else {
      this.card.classList.remove('flipToBack', 'grow')
      this.card.classList.add('flipToFront')
      this.setState({front: true})
      this.props.onFlipToBack()
    }
  }

  render() {
    return (
      <div className="my-3 card-container" onClick={this.toggleCard} ref={element => this.card = element}>
        <div className="card front">
          <img className='' src={image} alt="A misterious card"/>
        </div>
        <div className="card back"></div>
      </div> 
    )
  }
}

export default Card