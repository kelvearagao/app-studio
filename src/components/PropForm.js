import React, { Component } from 'react'
import {
    getElFromPage
} from '../utils/localJson'


export default class PropForm extends Component {

    // init state and bind methods
    constructor(props) {
        super(props)
        this.state = {
            props: []
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    getProps() {
        return [
            {name: "backgroundColor", value: ""},
            {name: "height", value: ""},
            {name: "width", value: ""},
            // border
            {name: "border", value: ""},
            {name: "borderStyle", value: "", type: "select", options: [
                {value: "dotted"},
                {value: "dashed"},
                {value: "solid"},
                {value: "double"},
                {value: "groove"},
                {value: "ridge"},
                {value: "inset"},
                {value: "outset"},
                {value: "none"},
                {value: "hidden"},
            ]},
            {name: "borderWidth", value: ""},
            {name: "borderColor", value: ""},
            {name: "borderRadius", value: ""},
            //
            {name: "padding", value: ""},
            {name: "margin", value: ""},
            {name: "position", value: ""},
            {name: "float", value: ""},
            {name: "top", value: ""},
            {name: "bottom", value: ""},
            {name: "right", value: ""},
            {name: "left", value: ""},
            // text
            {name: "color", value: ""},
            {name: "direction", value: ""},
            {name: "letterSpacing", value: ""},
            {name: "lineHeight", value: ""},
            {name: "textAlign", value: ""},
            {name: "textDecoration", value: ""},
            {name: "textIndent", value: ""},
            {name: "textShadow", value: ""},
            {name: "textTransform", value: ""},
            {name: "textOverflow", value: ""},
            {name: "unicodeBid", value: ""},
            {name: "verticalAlign", value: ""},
            {name: "whiteSpace", value: ""},
            {name: "worldSpacing", value: ""},
        ]
    }

    addPropsValues(values) {
        if(!values) {
            return this.getProps()
        }

        const props = this.getProps().map((prop) => {

            return {
                ...prop,
                value: values[prop.name] || ""
            }
        })

        return props;
    }

    getObjFromProps(props) {
        const obj = props.reduce((acm, item) => {
            if(item.value)
                acm[item.name] = item.value

            return acm
        }, {})

        return obj;
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        const props = this.state.props.map(item => {
          return item.name === name ? {...item, value} : item 
        })

        const el = JSON.parse(this.props.elJson);
        el.style = this.getObjFromProps(props);
        this.props.onChange({elJson: JSON.stringify(el, null, "\t")})

        this.setState({
            props: props
        })
    }

    // side-effects or subscriptions
    componentDidMount() {
        if(this.props.elName) {
            const el = JSON.parse(this.props.elJson);
            this.setState({
                props: this.addPropsValues(el.style)
            })
        }
    }

    dynamicInput(item) {
        if(item.type === 'select') {
            return <div>
                <lable>
                    {item.name}
                    <select className="prop-input"
                    type="text" name={item.name} value={item.value}
                    onChange={this.handleInputChange}> 
                        <option></option>
                        {item.options.map((option, key) => {
                            return <option key={key} value={option.value}>{option.value}</option>
                        })}
                    </select>
                </lable>
            </div>
        }

        return <div>
            <lable>
                {item.name}
                <input className="prop-input"
                type="text" name={item.name} value={item.value}
                onChange={this.handleInputChange}/>
            </lable>
        </div>
    }

    // deve ser puro, nao acessar o browser
    render() {
        const inputs = this.state.props.map((item) => {
            return this.dynamicInput(item)
        })

        return <div>
            { inputs }
        </div>
    }

}
/*
<div><lable>{item.name}
                <input className="prop-input"
                 type="text" name={item.name} value={item.value}
                 onChange={this.handleInputChange}/></lable></div>*/