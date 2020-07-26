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
    this.almostLoadedOptions = {
      duration: 2500,
      fill: 'forwards',
      easing: 'ease'
    }
    // Vaciar la barra :o
    this.dropLoad = [
      {width: '8%'}
    ]
    this.dropLoadOptions = {
      duration: 500,
      delay: this.almostLoadedOptions.duration,
      fill: 'forwards',
      easing: 'ease'
    }
    // Llenar la barra por completo
    this.loadComplete = [
      {width: '100%'}
    ]
    this.loadCompleteOptions = {
      duration: 250,
      delay: this.dropLoadOptions.duration + this.dropLoadOptions.delay + 1750,
      fill: 'forwards',
      easing: 'ease-out'
    }
    // Desaparecer contenedor
    this.hideProgressBar = [
      {opacity: 1, visibility: 'visible'},
      {opacity: 0, visibility: 'hidden'}
    ]
    this.hideProgressBarOptions = {
      duration: 1000,
      delay: this.loadCompleteOptions.delay + this.loadCompleteOptions.duration,
      fill: 'forwards',
      easeing: 'ease-out'
    }
  }

  componentDidMount = () => {
    this.progressBar.animate(this.almostLoaded, this.almostLoadedOptions)
    this.progressBar.animate(this.dropLoad, this.dropLoadOptions)
    this.progressBar.animate(this.loadComplete, this.loadCompleteOptions)
    this.progressContainer.animate(this.hideProgressBar, this.hideProgressBarOptions).onfinish = () => {
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