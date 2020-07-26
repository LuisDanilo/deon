import React, {Component} from 'react'
import './loading.scss'

class Loading extends Component {

  constructor(props) {
    super(props)
    // ANIMACIONES
    // Llenar la barra casi por completo
    this.almostLoaded = [
      {width: '8%', opacity: 0},
      {width: '95%', opacity: 1},
    ]
    this.almostDuration = {
      duration: 2500,
      fill: 'forwards',
      easing: 'ease'
    }
    // Vaciar la barra :o
    this.dropLoad = [
      {width: '8%'}
    ]
    this.dropDuration = {
      duration: 500,
      delay: this.almostDuration.duration,
      fill: 'forwards',
      easing: 'ease'
    }
    // Llenar la barra por completo
    this.loadComplete = [
      {width: '100%'}
    ]
    this.loadCompleteDuration = {
      duration: 250,
      delay: this.dropDuration.duration + this.dropDuration.delay + 1750,
      fill: 'forwards',
      easing: 'ease-out'
    }
    // Desaparecer contenedor
    this.hideProgressBar = [
      {opacity: 1, visibility: 'visible'},
      {opacity: 0, visibility: 'hidden'}
    ]
    this.hideProgressBarDuration = {
      duration: 1000,
      delay: this.loadCompleteDuration.delay + this.loadCompleteDuration.duration,
      fill: 'forwards',
      easeing: 'ease-out'
    }
  }

  componentDidMount = () => {
    this.progressBar.animate(this.almostLoaded, this.almostDuration)
    this.progressBar.animate(this.dropLoad, this.dropDuration)
    this.progressBar.animate(this.loadComplete, this.loadCompleteDuration)
    this.progressContainer.animate(this.hideProgressBar, this.hideProgressBarDuration).onfinish = () => {
      this.props.onLoadFinished()
    }
  }

  render() {
    return (
      <div className="progress-container" ref={element => this.progressContainer = element}>
        <div className="progress-bar" ref={element => this.progressBar = element}></div>
      </div>
    )
  }
}

export default Loading