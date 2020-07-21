import React, {Component} from 'react'
import Card from './Card'
//import Score from './Score'

const CardsSm = () => {
  return (
    <div className="row">
      <div className="col-6 my-3"><Card/></div>
      <div className="col-6 my-3"><Card/></div>
      <div className="col-6 my-3"><Card/></div>
      <div className="col-6 my-3"><Card/></div>
    </div>
  )
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
    if (0 <= w && w <= 767) this.setState({sm: true, md: false, lg: false, xl: false})
    else if (768 <= w && w <= 991) this.setState({sm: false, md: true, lg: false, xl: false})
    else if (992 <= w && w <= 1199) this.setState({sm: false, md: false, lg: true, xl: false})
    else if (w >= 1200) this.setState({sm: false, md: false, lg: false, xl: true})
    else this.setState({sm: true, md: false, lg: false, xl: false})
    console.log(this.state)
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.resize)
  }

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.resize)
  }

  render() {
    // Temporal components
    let cardsMd = 
      <div className="row">
        <h1>MD</h1>
      </div>
    let cardsLg = 
      <div className="row">
        <h1>LG</h1>
      </div>
    let cardsXl = 
      <div className="row">
        <h1>XL</h1>
      </div>
    return (
      <div className="container d-flex justify-content-center flex-column align-content-center cards-container">
        {/* <Score/> */}
        {/* Para pantallas por debajo de sm se muestran dos tarjetas por columna */}
        {/* A partir de pantallas md se desea mostrar tres tarjetas por columna */}
        { this.state.sm ? <CardsSm/> : 
          this.state.md ? cardsMd :
          this.state.lg ? cardsLg :
          this.state.xl ? cardsXl : <CardsSm/> }
      </div>
    )
  }
}

export default Cards