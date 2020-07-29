import React, { Component } from 'react'
import './fathertochildren.scss'

class Child extends Component {
  constructor(props) {
    super(props)
    this.state = {
      flag: false // Inital value, it's overwritten on componentWillMount()
    }
  }

  log = () => {
    console.log(`Hellooo I was invoked from parent`)
  }

  componentWillMount = () => {
    // Setting my state with "inherited" prop
    this.setState({ flag: this.props.childFlag })
  }

  componentWillReceiveProps(nextProps) {
    // Here I'll receive father's flag change ...
    console.log(`Child's receive props called, nextProps are ${nextProps}`)
    // but console.log() above doesn't appear ... nothing happens
  }

  render = () => {
    return (
      <p className='border border-success'>I have my flag = {this.state.flag ? 'True' : 'False'}</p>
    )
  }
}

// ---------------------------------------------------

class Father extends Component {
  constructor(props) {
    super(props)
    this.state = {
      flag: true, // Flag to be "inherited"
      children: [] // Children to be rendered
    }
  }

  componentWillMount = () => {
    let children = []
    for (let i = 0; i < 12; i++) {
      children.push(<Child key={`child-${i}`} childFlag={{...this.state}} />)
    }
    this.setState({ children })
  }

  toggleFlag = () => {
    // Get copy of current children
    let currentChildren = [...this.state.children]
    // Remove last threee children, now currenChildren has been modified
    let droppedChild = currentChildren.splice(0,3);
    let ultimateChildren = currentChildren.map(child => {
      console.log(child)
    })
    // setState for trigger re-render
    this.setState({ flag: !this.state.flag, children: currentChildren})
  }

  render = () => {
    // class "grid-3by4" is CSS grid, not relevant
    return (
      <div>
        <button onClick={this.toggleFlag} className='mb-3 btn btn-info'>Change Father's flag to {this.state.flag ? 'False' : 'True'}</button>
        <div className='grid-3by4'>
          {this.state.children}
        </div>
      </div>
    )
  }
}

export default Father