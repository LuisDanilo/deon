import React, { Component } from 'react'
import Card from '../Card'
//import Score from './Score'
import cssVars from '../../assets/scss/vars.scss';

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
      answered: 0,
      repeatCards: 3,
      gridCols: 2,
      gridRows: 2
    }
    this.nCards = Number(cssVars.nCards)
  }
  resize = () => {
    // Obtén ancho viewport
    let w = window.innerWidth
    // Define qué tipo de pantalla es
    let sm = (0 <= w && w <= 767)
    let md = (768 <= w && w <= 991)
    let lg = (992 <= w && w <= 1199)
    let xl = (w >= 1200)
    // Define según la pantalla cuantas cartas ha de presentar
    let gridRows = sm || md ? cssVars.gridRowsSmMd :
                   lg || xl ? cssVars.gridRowsLgXl : cssVars.gridRowsSmMd
    let gridCols = sm ? cssVars.gridColsSm :
                   md ? cssVars.gridColsMd :
                   lg || xl ? cssVars.gridColsLgXl : cssVars.gridColsSm
    // Define según la pantalla cuantas veces se repite un set de cartas
    let repeatCards = this.nCards / (gridCols * gridRows)
    // Añade la clase respectiva al contenedor de cartas
    let grid = sm ? 'grid-sm' :
               md ? 'grid-md' :
               lg ? 'grid-lg' :
               xl ? 'grid-xl' : 'grid-sm'
    this.cardsContainer.classList.remove('grid-sm', 'grid-md', 'grid-lg', 'grid-xl')
    this.cardsContainer.classList.add(grid)
    // Actualiza estado
    this.setState({sm, md, lg, xl, repeatCards, gridRows, gridCols})
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.resize)
    this.resize()
  }

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.resize)
  }

  cardAnswered = (e) => {
    let answered = this.state.answered + 1
    e.target.classList.add('disabled')
    this.setState({answered})
  }

  render() {
/*     let {sm, md, lg, xl, repeatCards, gridRows, gridCols} = this.state
    let message = sm ? `Soy sm, (${gridRows}x${gridCols})x${repeatCards}` :
                  md ? `Soy md, (${gridRows}x${gridCols})x${repeatCards}` :
                  lg ? `Soy lg, (${gridRows}x${gridCols})x${repeatCards}` :
                  xl ? `Soy xl, (${gridRows}x${gridCols})x${repeatCards}` :
                  `Soy default, repito: ${repeatCards}` */
                  
    let {gridCols, gridRows, answered} = this.state
    // Renderizar tarjetas si aun hay taretas por responder
    let renderCards = (answered !== this.nCards)
    console.log(`Respondidas: ${answered}, Total: ${this.nCards}, render?: ${renderCards}`)
    // Obtener tarjetas
    let cards = []
    for (let i = 0; i < gridCols * gridRows; i++) {
      cards.push(<button key={i} className='btn btn-info' onClick={this.cardAnswered}>Responder tarjeta</button>)
    }
    return (
      <div className="score-cards-container">
        <h1>Score = {this.state.answered}</h1>
        <div className="cards-container" ref={element => this.cardsContainer = element}>
          {renderCards ? cards.map(card => card) : <h2>Ya es toda we</h2> }
        </div>
      </div>
      
    )
  }
}

export default Cards