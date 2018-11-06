import React, { Component } from 'react';


export default class Tree extends Component {

    constructor(props) {
        super(props);
    }

    handleClick(item) {
        this.props.handleElClick({
            target: {
                value: item.name
            }
        })
    }

    getChildren(elName, elements) {
        //console.log(elName, elements)

        const children = elements[elName].childs && elements[elName].childs.map(value => {
            if(elements[value])  {
                elements[value].name = value;
                
                return elements[value];
            } 

            return value;
        })

        return  children;
    }

    getTree(children, elements) {
        return (
            <ul class="Tree">
                {children && children.map(item => {
                    if(item && item.name) {
                        return <li key={item.name}>
                            <a href="#" onClick={this.handleClick.bind(this, item)}>{item.name}</a>
                            {this.getTree(this.getChildren(item.name, elements), elements)}
                        </li>
                    }

                    return <ul><li>{item}</li></ul>
                })}    
            </ul>
        )
    }


    render() {
        const { elements } = this.props;
        const children = this.getChildren("container", elements);

        return this.getTree(children, elements)
    }
}