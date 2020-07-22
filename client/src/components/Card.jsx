import React, {Component} from 'react'
import image from '../assets/images/interrogation.svg'

class Card extends Component {

  constructor(props) {
    super(props)
    this.state = {
      front: true
    }
  }

  showCard = () => {
    if (this.state.front) {
      this.card.classList.remove('flipToFront')
      this.card.classList.add('flipToBack')
      this.setState({front: false})
    } else {
      this.card.classList.remove('flipToBack')
      this.card.classList.add('flipToFront')
      this.setState({front: true})
    }
    
  }

  render() {
    return (
      <div className="card-container" ref={element => this.card = element} onClick={this.showCard}>
        <div className="card front">
          <img src={image} alt="A misterious card"/>
        </div>
        <div className="card back">
          
        </div>
      </div>
    )
  }
}

export default Card