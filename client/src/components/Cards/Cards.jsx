import React, { Component } from 'react'
import Card from '../Card/Card'
//import Score from './Score'
import cssVars from '../../assets/scss/vars.scss';
class Cards extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sm: true,
      md: false,
      lg: false,
      xl: false,
      answered: 0,
      rendered: 4,
      gridCols: 2,
      gridRows: 2,
      repeatCards: false
    }
    this.nCards = 12
    this.cards = []
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
    // Define según la pantalla cuantas veces se repite un set de cartas de gridRows x gridCols
    //let repeatCards = this.nCards / (gridCols * gridRows) > 1
    // Añade la clase respectiva al contenedor de cartas
    let grid = sm ? 'grid-sm' :
               md ? 'grid-md' :
               lg ? 'grid-lg' :
               xl ? 'grid-xl' : 'grid-sm'
    let screen = sm ? 'sm' :
                 md ? 'md' :
                 lg ? 'lg' :
                 xl ? 'xl' : 'sm'
    this.cardsContainer.classList.remove('grid-sm', 'grid-md', 'grid-lg', 'grid-xl')
    this.cardsContainer.classList.add(grid)
    // DEBUG: Añadir color al score para saber que tipo de pantalla es
    this.score.classList.remove('sm', 'md', 'lg', 'xl')
    this.score.classList.add(screen)
    // Actualiza estado
    this.setState({sm, md, lg, xl, gridRows, gridCols, rendered: gridRows * gridCols, repeatCards: false})
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.resize)
    this.resize()
    // Obtener tarjetas
    let {gridCols, gridRows} = this.state
    for (let i = 0; i < gridCols * gridRows; i++) {
      //cards.push(<button key={i} className='btn btn-info' onClick={this.cardAnswered}>Responder tarjeta</button>)
      this.cards.push(<Card key={i} cardId={i} onAnswer={this.cardAnswered} renderAgain={this.state.repeatCards}/>)
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.resize)
  }

  cardAnswered = () => {
    console.log('Tarjeta respondida')
    let {answered, rendered} = this.state
    answered = answered + 1
    console.log(`Respondidas: ${answered}`)
    let repeatCards = rendered < this.nCards
    console.log(`Debo repetir el renderizado de la tarjeta? ${repeatCards}`)
    rendered = rendered + 1
    console.log(`Por tanto el contador de tarjetas renderizadas va en ${rendered}`)
    this.setState({answered, rendered, repeatCards})
  }

  render() {
/*     let {sm, md, lg, xl, repeatCards, gridRows, gridCols} = this.state
    let message = sm ? `Soy sm, (${gridRows}x${gridCols})x${repeatCards}` :
                  md ? `Soy md, (${gridRows}x${gridCols})x${repeatCards}` :
                  lg ? `Soy lg, (${gridRows}x${gridCols})x${repeatCards}` :
                  xl ? `Soy xl, (${gridRows}x${gridCols})x${repeatCards}` :
                  `Soy default, repito: ${repeatCards}` */
                  
    let {answered} = this.state
    // Renderizar tarjetas si aun hay taretas por responder
    let showFinalScore = (answered !== this.nCards)
    console.log(`Respondidas: ${answered}, Total: ${this.nCards}, Faltan por responder?: ${showFinalScore}, Tarjetas renderizadas: ${this.state.rendered}`)
    
    return (
      <div className="score-cards-container">
        <h1 ref={element => this.score = element}>Score = {this.state.answered}</h1>
        <div className="cards-container" ref={element => this.cardsContainer = element}>
          {showFinalScore ? this.cards.map(card => card) : <h2>Ya es toda we</h2> }
        </div>
      </div>
      
    )
  }
}

export default Cards