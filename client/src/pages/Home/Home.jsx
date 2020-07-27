import React, {Component} from 'react'
import Loading from '../../components/Loading/Loading'
import Title from '../../components/Title/Title'
import CardsRefactor from '../../components/Cards/CardsRefactor'
import './home.scss'


class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      start: false,
      loading: true,
      end: false
    }
  }

  loadFinished = () => {
    this.setState({loading: false})
  }

  start = () => {
    this.setState({start: true})
  }

  end = () => {
    this.setState({start: false, end: true})
  }

  render() {
    return (
      <div className="container-fluid">
        { this.state.loading ? <Loading onLoadFinished={this.loadFinished}/> : 
          this.state.start ? <CardsRefactor/> : 
          this.state.end ? <h1>Termino el juego</h1> : <Title onStart={this.start}/>}
      </div>
    )
  }
}

export default Home