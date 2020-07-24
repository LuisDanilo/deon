import React, { Component } from 'react'
import Card from '../Card'
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
    this.cards = [
      <Card/>, <Card/>, <Card/>, <Card/>, <Card/>, <Card/>,
      <Card/>, <Card/>, <Card/>, <Card/>, <Card/>, <Card/>
    ]
  }
  resize = () => {
    let w = window.innerWidth
    if (0 <= w && w <= 767) this.setState({ sm: true, md: false, lg: false, xl: false })
    else if (768 <= w && w <= 991) this.setState({ sm: false, md: true, lg: false, xl: false })
    else if (992 <= w && w <= 1199) this.setState({ sm: false, md: false, lg: true, xl: false })
    else if (w >= 1200) this.setState({ sm: false, md: false, lg: false, xl: true })
    else this.setState({ sm: true, md: false, lg: false, xl: false })
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.resize)
    this.resize()
  }

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.resize)
  }

  render() {
    return (
      this.state.sm ? <h1>Soy sm</h1> :
      this.state.md ? <h1>Soy md</h1> :
      this.state.lg ? <h1>Soy lg</h1> :
      this.state.xl ? <h1>Soy xl</h1> : <h1>Soy default</h1>
    )
  }
}

export default Cards