import React, { Component } from 'react'
import TimeSelection from 'react-time-selection'

export default class App extends Component {
  state = {
    time: '10 : 00 AM'
  }
  render () {
    const { time } = this.state;
    return (
      <div style={{marginLeft: '100px'}}>
        <TimeSelection value={time} onTimeChange={(time) => this.setState({time})} />
      </div>
    )
  }
}
