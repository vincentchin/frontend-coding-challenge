import React, { Component } from 'react';

class Event extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.index}</td>
                <td>{this.props.title}</td>
                <td>{this.props.startTime}</td>
                <td>{this.props.endTime}</td>
            </tr>
        );
    }
}

export default Event;
