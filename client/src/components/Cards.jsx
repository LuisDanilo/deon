import React, { Component } from 'react'
import Card from './Card'
//import Score from './Score'

class CardsSm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
  }

  expandCard = () => {
    this.setState({expanded: true})
    this.row.classList.add('expandChild')
  }

  shrinkCard = () => {
    this.setState({expanded: false})
    this.row.classList.remove('expandChild')
  }

  render() {
    return (
      <div className="row" ref={element => this.row = element}>
        <Card onFlipToFront={this.expandCard} onFlipToBack={this.shrinkCard}/>
        <Card onFlipToFront={this.expandCard} onFlipToBack={this.shrinkCard}/>
        <Card onFlipToFront={this.expandCard} onFlipToBack={this.shrinkCard}/>
        <Card onFlipToFront={this.expandCard} onFlipToBack={this.shrinkCard}/>
      </div>
    )
  }
}
class Cards extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sm: true,
      md: false,
      lg: false,
      xl: false,
      answered: 0
    }
  }
  resize = () => {
    let w = window.innerWidth
    if (0 <= w && w <= 767) this.setState({ sm: true, md: false, lg: false, xl: false })
    else if (768 <= w && w <= 991) this.setState({ sm: false, md: true, lg: false, xl: false })
    else if (992 <= w && w <= 1199) this.setState({ sm: false, md: false, lg: true, xl: false })
    else if (w >= 1200) this.setState({ sm: false, md: false, lg: false, xl: true })
    else this.setState({ sm: true, md: false, lg: false, xl: false })
    console.log(this.state)
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.resize)
  }

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.resize)
  }

  render() {
    return (
      <div className="container d-flex justify-content-center flex-column align-content-center cards-container">
        {/* <Score/> */}
        {/* Para pantallas por debajo de sm se muestran dos tarjetas por columna */}
        {/* A partir de pantallas md se desea mostrar tres tarjetas por columna */}
        {this.state.sm ? <CardsSm /> : <CardsSm />}
      </div>
    )
  }
}

export default Cards