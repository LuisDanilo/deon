import React, { Component } from 'react'
import css from './cards.scss'
import Card from '../Card/Card'

class CardsRefactor extends Component {

  constructor(props) {
    super(props)
    this.state = {
      score: 0,
      cards: [],
      cardsFlipped: [],
      currentCard: -1,
      grow: false,
      finished: false,
      answered: 0
    }
    // ANIMACIONES
    this.fadeIn = [
      { opacity: 0, visibility: 'hidden' },
      { opacity: 1, visibility: 'visible' }
    ]
    this.fadeInOptions = {
      duration: 1000,
      easing: 'ease-in',
      fill: 'forwards'
    }
    this.cardGrow = [
      { gridColumnStart: 1 },
      { gridColumnEnd: this.cols + 1 }
    ]
    this.cardGrowOptions = {
      duration: 1000,
      easing: 'ease-in-out',
      fill: 'forwards'
    }
    // Tamaños de pantalla bootstrap
    this.maxSm = 767
    this.maxMd = 991
    this.maxLg = 1199
    // Columnas y filas
    this.cols = 0
    this.rows = 0
  }

  showOneCard = (i) => {
    //console.log('Soy el que tengo acceso a la grilla, debo hacer crecer la carta')
    this.container.animate(this.fadeIn, this.fadeInOptions)
    this.cardsContainer.classList.toggle('noGrid')
    // Copiar arreglo de indices de tarjetas volteadas
    let cardsFlipped = [...this.state.cardsFlipped]
    cardsFlipped.push(i)
    // Actualizar estado
    this.setState({ grow: true, cardsFlipped, currentCard: i })
  }

  showAllCards = () => {
    this.container.animate(this.fadeIn, this.fadeInOptions)
    this.cardsContainer.classList.toggle('noGrid')
    let {answered, finished, cards} = this.state
    answered = answered + 1
    finished = (answered === cards.length)
    this.setState({ grow: false, finished, answered})
  }

  nice = () => {
    this.setState({score: this.state.score + 1})
  }

  getCards = () => {
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
        cards.push(<Card key={`card-${i}`} onFlipToBack={this.showOneCard} onFlipToFront={this.showAllCards} onAnswerCorrect={this.nice} cardIndex={i} />)
      }
    } else if (currentCards > toRender) {
      //console.log(`%cResize resultó en un exceso de tarjetas`, 'color: red')
      // Sobran cartas al arreglo, deben retirarse cartas
      cards.splice(-(currentCards - toRender))
    } else {
      //console.log(`%cResize resultó en tarjetas justas`, 'color: lime')
    }
    // Actualizar estado para que se reflejen los cambios
    this.setState({ cards })
  }

  screenResized = () => {
    /* debugger */
    // Obtener ancho de viweport
    let w = window.innerWidth
    // Quitar posibles clases asignadas
    let classesCardsContainer = this.cardsContainer.className
    let classesContainer = this.container.className
    this.cardsContainer.className = classesCardsContainer.replace(/grid-(sm|md|lg|xl)/, '')
    this.container.className = classesContainer.replace(/(sm|md|lg|xl)/, '')
    // Evaluar tamaño de pantalla y con ello la forma de la grilla
    if (0 <= w && w <= this.maxSm) {
      this.cardsContainer.classList.add('grid-sm')
      this.container.classList.add('sm')
      this.cols = Number(css.colsSm)
      this.rows = Number(css.rowsSm)
    } else if (this.maxSm + 1 <= w && w <= this.maxMd) {
      this.cardsContainer.classList.add('grid-md')
      this.container.classList.add('md')
      this.cols = Number(css.colsMd)
      this.rows = Number(css.rowsMd)
    } else if (this.maxMd + 1 <= w && w <= this.maxLg) {
      this.cardsContainer.classList.add('grid-lg')
      this.container.classList.add('lg')
      this.cols = Number(css.colsLg)
      this.rows = Number(css.rowsLg)
    } else if (w >= this.maxLg + 1) {
      this.cardsContainer.classList.add('grid-xl')
      this.container.classList.add('xl')
      this.cols = Number(css.colsLg)
      this.rows = Number(css.rowsLg)
    }
    this.getCards()
  }

  componentDidMount = () => {
    // Agrego listener
    window.addEventListener('resize', this.screenResized)
    this.screenResized()
    // Iniciar animaciones
    this.container.animate(this.fadeIn, this.fadeInOptions)
  }

  componentWillUnmount = () => {
    // Retiro listener
    window.removeEventListener('resize', this.screenResized)
  }

  render() {
    let { grow, cards, currentCard, cardsFlipped, finished } = this.state
    let toRender = []
    cards.forEach((card, i ) => {
      if (cardsFlipped.includes(i)) {
        toRender.push(<div key={`div-${i}`}></div>)
      } else {
        toRender.push(card)
      }
    })
    return (
      <div className='cards-score-container' ref={element => this.container = element}>
         {finished ? 
            <h1 className='text-white text-uppercase'>Tu puntaje: {this.state.score}</h1> :
            <div className="cards-container" ref={element => this.cardsContainer = element}>
              { grow ? cards[currentCard] : toRender}
            </div> }
      </div>
    )
  }
}

export default CardsRefactor