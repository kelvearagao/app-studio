import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import logo from './logo.svg'
import './App.css'
import json from './jsons/page1'
import PropForm from './components/PropForm'

class App extends Component {
  state = {
    newElementName: '',
    selectedElement: '',
    elementJson: ''
  }

  constructor(props) {
    super(props)

    this.handleSelectedElChange = this.handleSelectedElChange.bind(this)
    this.handleSelectedElJsonChange = this.handleSelectedElJsonChange.bind(this)
    this.handleAddElementClick = this.handleAddElementClick.bind(this)
    this.handleNewElementName = this.handleNewElementName.bind(this)
    this.handlePropFormChange = this.handlePropFormChange.bind(this)
  }

  getJson() {
    const item = localStorage.getItem('page1')

    if (!item) localStorage.setItem('page1', JSON.stringify(json))

    return JSON.parse(item)
  }

  handleAddElementClick() {
    this.addJsonKey(this.state.newElementName)
    this.setState({
      newElementName: ''
    })
  }

  handleNewElementName(event) {
    this.setState({
      newElementName: event.target.value
    })
  }

  addJsonKey(key) {
    if(!key) {
      return
    }

    const json = this.getJson();
    json[key] = {type: 'div'};

    localStorage.setItem('page1', JSON.stringify(json));
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

      if(item.css) {
        let styles = ""
        Object.entries(item.css).map(([key, value]) => {
          styles += key + JSON.stringify(value).replace(/"/g, "").replace(/,/g,";")+" "
        })
        listEl.push(React.createElement('style', null, styles));
      }

      const childEls = this.createChilds(items, item.childs)

      const el = React.createElement(item.type, { 
        style: item.style, 
        className: item.className,
        type: item.inputType, value: item.value, placeholder: item.placeholder }, childEls.length ? childEls : null)

      listEl.push(el)
    }

    return listEl
  }

  handleSelectedElChange(event) {
    this.setState({
      selectedElement: event.target.value,
      elementJson: JSON.stringify(this.getJson()[event.target.value], null, "\t")
    })
  }

  updateElJson(value) {
    const json = this.getJson()

    try {
      json[this.state.selectedElement] = JSON.parse(value)
      localStorage.setItem('page1', JSON.stringify(json))
    } catch (e) {
      console.log('erro ao editar', e)
    }

    this.setState({
      elementJson: value,
    })
  }

  handleSelectedElJsonChange(event) {
    this.updateElJson(event.target.value)
  }

  handlePropFormChange(event) {
    //console.log(event)
    this.updateElJson(event.elJson)
  }

  componentDidMount() {}

  render() {
    const result = Object.entries(this.getJson()).map(([key, value]) => {
      return <option>{key}</option>
    })

    return (
      <div style={{ height: '100%', postion: 'realtive' }}>
        <div
          className="canvas view-box"
          id="view"
          style={{ height: '100%'}}
        >
          {this.addElements(this.getJson())}
        </div>
        <div />

        <div className="view-box box-setup">
          <input type="text" value={this.state.newElementName} onChange={this.handleNewElementName} /> 
          <input type="button" value="Add" onClick={this.handleAddElementClick}/>
          <br />

          <select
            value={this.state.selectedElement}
            onChange={this.handleSelectedElChange}
          >
            <option>Select Element</option>
            {result}
          </select>
          <input type="button" value="Remove"/>
          <br />
          <br />
          
          <table width="100%" border="0">
            <tr>
              <td width="50%">
                <textarea
                  className="json-textarea"
                  value={this.state.elementJson}
                  onChange={this.handleSelectedElJsonChange}
                />
              </td>
              <td width="50%" align="right" valign="top">
                <PropForm key={this.state.selectedElement} 
                  elName={this.state.selectedElement} 
                  elJson={this.state.elementJson} 
                  onChange={this.handlePropFormChange}/>
              </td>
            </tr>
          </table>

        </div>
      </div>
    )
  }
}

export default App
