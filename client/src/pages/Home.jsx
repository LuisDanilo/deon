import React, {Component} from 'react'

class Home extends Component {

  start = () => {
    alert('Start!')
  }

  render() {
    return (
      <div className="demo">
        <div className="content">
            <div id="large-header" className="large-header">
              <canvas id="demo-canvas"></canvas>
              <div className="title-container">
                <h1 className="main-title">
                  <span id="start" onClick={this.start}>D</span>
                  <span className="thin">eon</span>
                </h1>
              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Home