import React, { Component } from 'react'

class Circle extends Component {

  constructor(props) {
    super(props)
    this.state = {
      half: false,
      done: false,
      raw: true
    }
  }

  render() {
    return (
      <div className="circle col-1">{this.props.children}</div>
    )
  }
}

class Score extends Component {
  render() {
    return (
      <div className="row">
        <Circle>1</Circle>
        <Circle>2</Circle>
        <Circle>3</Circle>
        <Circle>4</Circle>
        <Circle>5</Circle>
        <Circle>6</Circle>
        <Circle>7</Circle>
        <Circle>8</Circle>
        <Circle>9</Circle>
        <Circle>10</Circle>
        <Circle>11</Circle>
        <Circle>12</Circle>
      </div>
    )
  }
}

export default Score