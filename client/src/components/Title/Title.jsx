import React, {Component} from 'react'
import './title.scss'

class Title extends Component {

  constructor(props) {
    super(props)
    // ANIMACIONES
    // FadeIn
    this.fadeIn = [
      {opacity: 0, visibility: 'hidden'},
      {opacity: 1, visibility: 'visible'}
    ]
    this.fadeInOptions = {
      duration: 1500,
      easing: 'ease-in',
      fill: 'forwards'
    }
    // FadeOut
    this.fadeOut = [
      {opacity: 1, visibility: 'visible'},
      {opacity: 0, visibility: 'hidden', color: 'lime'}
    ]
    this.fadeOutOptions = {
      duration: 1500,
      easing: 'ease-out',
      fill: 'forwards'
    }
  }

  onClick = () => {
    this.title.animate(this.fadeOut, this.fadeOutOptions).onfinish = () => {
      this.props.onStart()
    }
  }

  componentDidMount = () => {
    this.title.animate(this.fadeIn, this.fadeInOptions)
  }

  render() {
    return (
      <h1 className='title' ref={element => this.title = element}>
        <span className='btnStart' onClick={this.onClick} ref={element => this.btnStart = element}>D</span>
        <span>eon</span>
      </h1>
    )
  }
}

export default Title