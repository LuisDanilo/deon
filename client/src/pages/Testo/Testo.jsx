import React, {Component} from 'react'
// Indicador de pantalla
import Screen from '../../components/Screen/Screen'
// Estilos de esta página
import './testo.scss'
// Componenete a testear
import CardsRefactor from '../../components/Cards/CardsRefactor'

class Testo extends Component {

  testo = () => {
    console.log('Termina el juego prro')
  }

  render() {
    return (
      <div className="container-center">
        <Screen/>
        <CardsRefactor/>
      </div>
    )
  }
}

export default Testo