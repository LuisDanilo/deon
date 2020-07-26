import React, {Component} from 'react'
//import image from '../../assets/images/interrogation.svg'

class Card extends Component {

  constructor(props) {
    super(props)
    this.state = {
      front: true,
      renderAgain: false
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

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps)
    console.log(nextState)
  }

  componentDidMount() {
    if (this.props.renderAgain) {
      this.cardContainer.classList.remove('fadeOut')
      this.cardContainer.classList.add('fadeIn')
      this.setState({renderAgain: false})
    }
  }

  answered = (e) => {
    e.target.disabled = true
    this.cardContainer.classList.remove('fadeIn')
    this.cardContainer.classList.add('fadeOut')
    this.props.onAnswer()
  }

  render() {
    /* <div className="card-container" onClick={this.toggleCard} ref={element => this.card = element}>
        <div className="card front">
          <img className='' src={image} alt="A misterious card"/>
        </div>
        <div className="card back"></div>
      </div>  */
    return (
      <div className='card-container' ref={element => this.cardContainer = element}>
        <h4>{this.state.renderAgain}</h4>
        <button className='btn btn-success' onClick={this.answered}>Responder</button>
        <button className='btn btn-danger'>No responder</button>
      </div>
    )
  }
}

export default Card