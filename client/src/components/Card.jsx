import React, {Component} from 'react'
import image from '../assets/images/interrogation.svg'

class Card extends Component {
  render() {
    return (
      <div className="card">
        <img src={image} alt="A misterious card"/>
      </div>
    )
  }
}

export default Card