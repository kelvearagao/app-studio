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
            {name: "border", value: ""},
            {name: "padding", value: ""},
            {name: "margin", value: ""},
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

    // deve ser puro, nao acessar o browser
    render() {
        const inputs = this.state.props.map((item) => {
            return <div><lable>{item.name}
                <input type="text" name={item.name} value={item.value}
                 onChange={this.handleInputChange}/></lable></div>
        })

        return <div>
            { inputs }
        </div>
    }

}