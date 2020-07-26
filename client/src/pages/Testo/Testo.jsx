import React, {Component} from 'react'
// Componenete a testear
import Loading from '../../components/Loading/Loading'
// Estilos de esta página
import './testo.scss'
// Indicador de pantalla
import Screen from '../../components/Screen/Screen'

class Testo extends Component {

  testo = () => {
    console.log('Animaciones terminadas')
  }

  render() {
    return (
      <div className="container-center">
        <Screen/>
        <Loading onLoadFinished={this.testo}/>
      </div>
    )
  }
}

export default Testo