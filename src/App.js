import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import json from './jsons/page1'

class App extends Component {

  getJson() {
    return json;
  }

  addElements(items) {
    this.addElement(items, 'view', 'container', items['container'])
  }

  addElement(items, fatherKey, key, item) {
    const childs = this.createChilds(items, item.childs);

    const el = React.createElement(
      items[key].type, 
      {style: item.style},
      childs
    )

    ReactDOM.render(el, document.getElementById(fatherKey));
  }

  createChilds(items, childs) {
    const listEl = [];
    
    for(let i in childs) {
      const key = childs[i]
      if(!items[key]) {
        listEl.push(key)
        continue;
      }

      const item = items[key];

      const childEls = this.createChilds(items, item.childs);

      const el = React.createElement(
        item.type, 
        {style: item.style},
        childEls
      );

      listEl.push(el);
    }

    return listEl;
  }

  componentDidMount() {
    this.addElements(this.getJson())
  }

  render() {

    return (
      <div style={{height: '100%'}}>
        <div id="view" style={{height: '100%', width: '50%', border: "1px solid red"}}>

        </div>
        <div>

        </div>
      </div>
    );
  }
}

export default App;
