import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class DeviceFrame extends Component {

    constructor(props) {
        super(props)

        this.iframeRef = React.createRef();
    }

    componentDidMount() {
        this.iframeRef.current.contentDocument.body.setAttribute("style", "margin: 0px");
        ReactDOM.render(this.props.elements, this.iframeRef.current.contentDocument.body)

        const style = React.createElement('style', null, '* { padding: 0; margin: 0; box-sizing: border-box; }');
        ReactDOM.render(style, this.iframeRef.current.contentDocument.head)
    }

    render() {
        if(this.iframeRef.current) {
            ReactDOM.render(this.props.elements, this.iframeRef.current.contentDocument.body)
        }

        return <iframe className="device-view" ref={this.iframeRef}></iframe>
    }
}