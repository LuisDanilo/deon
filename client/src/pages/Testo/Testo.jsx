import React, {Component} from 'react'
// Indicador de pantalla
import Screen from '../../components/Screen/Screen'
// Estilos de esta página
import './testo.scss'
// Componenete a testear
import Title from '../../components/Title/Title'

class Testo extends Component {

  testo = () => {
    console.log('Inicia el juego prro')
  }

  render() {
    return (
      <div className="container-center">
        <Screen/>
        <Title onStart={this.testo}/>
      </div>
    )
  }
}

export default Testo