import React, {Component} from 'react'
import cssVars from '../assets/vars.scss'

class Title extends Component {

  onClick = () => {
    this.title.classList.remove('fadeIn')
    this.title.classList.add('fadeOut')
    setTimeout(this.props.onStart, cssVars.fadeOut.slice(0, -1) * 1000)
  }

  render() {
    return (
      <h1 className='noSelection cartoon fadeIn' ref={element => this.title = element}>
        <span className='btnStart' onClick={this.onClick}>D</span>
        <span>eon</span>
      </h1>
    )
  }
}

export default Title