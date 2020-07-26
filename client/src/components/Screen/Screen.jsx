import React, { Component } from 'react'

class Screen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      screen: '---'
    }
    // Tamaños de pantalla bootstrap
    this.maxSm = 767
    this.maxMd = 991
    this.maxLg = 1199
    // Animaciones de prueba
    this.smKeyframes = [
      {color: '#fff'},
      {color: 'lime'}
    ]
    this.mdKeyframes = [
      {color: '#fff'},
      {color: 'yellow'}
    ]
    this.lgKeyframes = [
      {color: '#fff'},
      {color: 'red'}
    ]
    this.xlKeyframes = [
      {color: '#fff'},
      {color: 'purple'}
    ]
    this.animateOptions = {
      duration: 1000,
      easing: 'ease',
      fill: 'forwards'
    }
  }

  getSize = () => {
    let w = window.innerWidth
    let screen = ''
    if (0 <= w && w <= this.maxSm) {
      screen = 'Small'
      this.title.animate(this.smKeyframes, this.animateOptions)
    } else if (this.maxSm + 1 <= w && w <= this.maxMd) {
      screen = 'Medium'
      this.title.animate(this.mdKeyframes, this.animateOptions)
    } else if (this.maxMd + 1 <= w && w <= this.maxLg) {
      screen = 'Large'
      this.title.animate(this.lgKeyframes, this.animateOptions)
    } else if (w >= this.maxLg + 1) {
      screen = 'Extra large'
      this.title.animate(this.xlKeyframes, this.animateOptions)
    }
    this.setState({screen})
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.getSize)
    this.getSize()
  }

  render() {
    return (
      <h2 ref={element => this.title = element}>{this.state.screen}</h2>
    )
  }
}

export default Screen