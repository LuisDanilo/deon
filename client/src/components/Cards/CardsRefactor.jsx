import React, {Component} from 'react'
import css from './cards.scss'
import Card from '../Card/Card'

class CardsRefactor extends Component {

  constructor(props) {
    super(props)
    this.state = {
      score: 0,
      answered: 0,
      cards: []
    }
    // ANIMACIONES
    this.fadeIn = [
      {opacity: 0, visibility: 'hidden'},
      {opacity: 1, visibility: 'visible'}
    ]
    this.fadeInOptions = {
      duration: 1000,
      easing: 'ease-in',
      fill: 'forwards'
    }
    // Tamaños de pantalla bootstrap
    this.maxSm = 767
    this.maxMd = 991
    this.maxLg = 1199
    // Tarjetas a renderizar
    this.cols = 0
    this.rows = 0
  }

  getCards = () => {
    /* debugger */
    // Agregar o remover tarjetas a renderizar
    let currentCards = this.state.cards.length // Cuantas hay?
    let toRender = this.rows * this.cols // Cuantas deben ser renderizadas con la grilla calculada
    let cards = this.state.cards // Arreglo de componentes Card
    //console.log(`Actualmente cuento con las siguientes tarjetas ${JSON.stringify(cards)}`)
    if (currentCards < toRender) {
      //console.log(`%cResize resultó en una falta de tarjetas`, 'color: yellow')
      // Faltan cartas al arreglo, deben agregarse cartas
      for (let i = currentCards; i < toRender; i++) {
        // Aqui van las Cards
        //cards.push(<button className='btn btn-info' key={`card-${i}`}>Soy una tarjeta</button>)
        cards.push(<Card key={`card-${i}`}/>)
      }
    } else if (currentCards > toRender) {
      //console.log(`%cResize resultó en un exceso de tarjetas`, 'color: red')
      // Sobran cartas al arreglo, deben retirarse cartas
      cards.splice(-(currentCards - toRender))
    } else {
      //console.log(`%cResize resultó en tarjetas justas`, 'color: lime')
    }
    // Actualizar estado para que se reflejen los cambios
    this.setState({cards})
  }

  screenResized = () => {
    /* debugger */
    // Obtener ancho de viweport
    let w = window.innerWidth
    // Quitar posibles clases asignadas
    let classes = this.cardsContainer.className
    this.cardsContainer.className = classes.replace(/grid-(sm|md|lg|xl)/, '')
    // Evaluar tamaño de pantalla y con ello la forma de la grilla
    if (0 <= w && w <= this.maxSm) {
      this.cardsContainer.classList.add('grid-sm')
      this.cols = Number(css.colsSm)
      this.rows = Number(css.rowsSm)
    } else if (this.maxSm + 1 <= w && w <= this.maxMd) {
      this.cardsContainer.classList.add('grid-md')
      this.cols = Number(css.colsMd)
      this.rows = Number(css.rowsMd)
    } else if (this.maxMd + 1 <= w && w <= this.maxLg) {
      this.cardsContainer.classList.add('grid-lg')
      this.cols = Number(css.colsLg)
      this.rows = Number(css.rowsLg)
    } else if (w >= this.maxLg + 1) {
      this.cardsContainer.classList.add('grid-xl')
      this.cols = Number(css.colsLg)
      this.rows = Number(css.rowsLg)
    }
    // Obtener tarjetas segun la nueva forma de la grilla
    this.getCards()
  }

  componentDidMount = () => {
    /* debugger */
    window.addEventListener('resize', this.screenResized)
    // Establecer forma de la grilla
    this.screenResized()
    // Iniciar animaciones
    this.container.animate(this.fadeIn, this.fadeInOptions)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.screenResized)
  }

  render() {
    /* debugger */
    return (
      <div className='cards-score-container' ref={element => this.container = element}>
        <h1>Score = {this.state.score}</h1>
        <h4>Answered: {this.state.answered}</h4>
        <div className="cards-container" ref={element => this.cardsContainer = element}>
          {this.state.cards.map(card => card)}
        </div>
      </div>
    )
  }
}

export default CardsRefactor