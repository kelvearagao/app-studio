import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import logo from './logo.svg'
import './App.css'
import json from './jsons/page1'

class App extends Component {
  state = {
    selectedElement: '',
    elementJson: ''
  }

  constructor(props) {
    super(props)

    this.handleSelectedElChange = this.handleSelectedElChange.bind(this)
    this.handleSelectedElJsonChange = this.handleSelectedElJsonChange.bind(this)
  }

  getJson() {
    const item = localStorage.getItem('page1')

    if (!item) localStorage.setItem('page1', JSON.stringify(json))

    return JSON.parse(item)
  }

  addElements(items) {
    return this.addElement(items, 'view', 'container', items['container'])
  }

  addElement(items, fatherKey, key, item) {
    const childs = this.createChilds(items, item.childs)

    const el = React.createElement(
      items[key].type,
      { style: item.style },
      childs
    )

    // ReactDOM.render(el, document.getElementById(fatherKey))

    return el
  }

  createChilds(items, childs) {
    const listEl = []

    for (let i in childs) {
      const key = childs[i]
      if (!items[key]) {
        listEl.push(key)
        continue
      }

      const item = items[key]

      const childEls = this.createChilds(items, item.childs)

      const el = React.createElement(item.type, { style: item.style }, childEls)

      listEl.push(el)
    }

    return listEl
  }

  handleSelectedElChange(event) {
    this.setState({
      selectedElement: event.target.value,
      elementJson: JSON.stringify(this.getJson()[event.target.value])
    })
  }

  handleSelectedElJsonChange(event) {
    const json = this.getJson()

    try {
      json[this.state.selectedElement] = JSON.parse(event.target.value)
      localStorage.setItem('page1', JSON.stringify(json))
    } catch (e) {
      console.log('erro ao editar', e)
    }

    this.setState({
      elementJson: event.target.value
    })
  }

  componentDidMount() {}

  render() {
    const result = Object.entries(this.getJson()).map(([key, value]) => {
      return <option>{key}</option>
    })

    return (
      <div style={{ height: '100%', postion: 'realtive' }}>
        <div
          className="view-box"
          id="view"
          style={{ height: '100%', borderRight: '1px solid red' }}
        >
          {this.addElements(this.getJson())}
        </div>
        <div />
        <div className="view-box">
          <label>
            Elementos{' '}
            <select
              value={this.state.selectedElement}
              onChange={this.handleSelectedElChange}
            >
              {result}
            </select>
          </label>
          <br />
          <br />
          <textarea
            value={this.state.elementJson}
            onChange={this.handleSelectedElJsonChange}
          />
        </div>
      </div>
    )
  }
}

export default App
