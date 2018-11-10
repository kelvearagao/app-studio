import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class DeviceFrame extends Component {

    constructor(props) {
        super(props)

        this.iframeRef = React.createRef();
    }

    componentDidMount() {
        ReactDOM.render(this.props.elements, this.iframeRef.current.contentDocument.body)
        this.iframeRef.current.contentDocument.body.setAttribute("style", "margin: 0px");
    }

    render() {
        if(this.iframeRef.current) {
            ReactDOM.render(this.props.elements, this.iframeRef.current.contentDocument.body)
        }

        return <iframe className="device-view" ref={this.iframeRef}></iframe>
    }
}