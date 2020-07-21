import React, {Component} from 'react'
import Loading from '../components/Loading'
import Title from '../components/Title'
import Cards from '../components/Cards'


class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      start: false,
      loading: true
    }
    /* this.state = {
      start: true,
      loading: false
    } */
  }

  hideProgressBar = () => {
    this.setState({loading: false})
  }

  start = () => {
    this.setState({start: true})
  }

  render() {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center">
        { this.state.loading ? <Loading didMount={this.hideProgressBar}/> : 
          this.state.start ? <Cards/> : <Title onStart={this.start}/>}
      </div>
    )
  }
}

export default Home