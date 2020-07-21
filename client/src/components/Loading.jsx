import React, {Component} from 'react'
import cssVars from '../assets/vars.scss'

class Loading extends Component {

  componentDidMount = () => {
    setTimeout(this.props.didMount, cssVars.progressBar.slice(0, -1) * 1000)
  }

  render() {
    return (
      <div className="progress">
        <div className="progress-value"></div>
      </div>
    )
  }
}

export default Loading