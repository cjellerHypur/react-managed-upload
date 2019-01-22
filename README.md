# react-time-selection

> A simple time picker based on [react-dates](https://github.com/airbnb/react-dates) and [react-timepicki](https://github.com/senthilraj/react-timepicki)

[![NPM](https://img.shields.io/npm/v/react-time-selection.svg)](https://www.npmjs.com/package/react-time-selection) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-airbnb-brightgreen.svg)](https://github.com/airbnb/javascript) [![Build Status](https://travis-ci.org/cjellerHypur/react-time-selection.svg?branch=master)](https://travis-ci.org/cjellerHypur/react-time-selection)

## Install

```bash
npm install --save react-time-selection
```

## Usage

```jsx
import React, { Component } from 'react'
import ReactTimeSelection from 'react-time-selection'

class Example extends Component {
  render () {
    return (
      <ReactTimeSelection />
    )
  }
}
```

Or for 24 hour (Military) Time

```jsx
import React, { Component } from 'react'
import ReactTimeSelection from 'react-time-selection'

class Example extends Component {
  render () {
    return (
      <ReactTimeSelection isMilitaryTime />
    )
  }
}
```

Controlled Component

```jsx
import React, { Component } from 'react'
import TimeSelection from 'react-time-selection'

export default class App extends Component {
  state = {
    time: '10 : 00 AM'
  }
  render () {
    const { time } = this.state;
    return (
      <div>
        <TimeSelection value={time} onTimeChange={(time) => this.setState({time})} />
      </div>
    )
  }
}

```

## Props

```
isMilitaryTime: PropTypes.bool,
placeholder: PropTypes.string,
value: PropTypes.string,
onTimeChange: PropTypes.func,
onChange: PropTypes.func, // handles change of input element
inputClass: PropTypes.string, // classes to style input element
```

## License

MIT © [cjellerHypur](https://github.com/cjellerHypur)
