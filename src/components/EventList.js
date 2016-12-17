import React, { Component } from 'react';

import Event from './Event';
import Form from './Form';
import Search from './Search';
import { Table } from 'react-bootstrap';

import moment from 'moment';

class EventList extends Component {
    constructor(props){
        super(props);
        this.state = {
            headers: ['#', 'Title', 'Start Time', 'End Time'],
            localEvents: [],
            search: ''
        }
    }

    componentWillReceiveProps(props) {
        if (props.events !== undefined) {
            this.setState({ localEvents: props.events })
        }
    }

    onSearch(e) {
        this.setState({
            search: e.target.value
        });
    }

    sortCol(type) {
        let events = this.state.localEvents

        if (type === "Title") {
            let sortedTitle = events.sort((a, b) => {
                if (a.title > b.title) return 1
                if (a.title < b.title) return -1
                return 0
            })

            this.setState({localEvents: sortedTitle})

        } else if (type === "Start Time") {
            let sortedStart = events.sort((a, b) => {
                return moment(a.start_time) - moment(b.start_time)
            })

          this.setState({localEvents: sortedStart})

        } else if (type === "End Time") {
            let sortedEnd = events.sort((a, b) => {
                return moment(a.end_time) - moment(b.end_time)
            })

            this.setState({localEvents: sortedEnd})

        }
    }

    addEvent(event) {
        let events = this.state.localEvents;
        events.push(event)

        this.setState({
          localEvents: events
        })
    }

    render() {
        let filteredEvents = this.state.localEvents.filter(
                (event) => {
                    return event.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                }
            ),
            events = this.state.search ? filteredEvents : this.state.localEvents;
        return (
            <div>
                <Search search={this.state.search} onSearch={(e) => this.onSearch(e)} />
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            { this.state.headers.map((header, i) => {
                                    return (
                                        <th
                                            key={i}
                                            onClick={() => this.sortCol(header)}
                                        >
                                        {header}
                                        </th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        { events.map((event, i) => {
                                return (
                                    <Event
                                        key={i}
                                        index={i + 1}
                                        title={event.title}
                                        startTime={moment(event.start_time).format("MM/DD/YYYY hh:mm A")}
                                        endTime={moment(event.end_time).format("MM/DD/YYYY hh:mm A")}
                                    />
                                )
                            })
                        }
                    </tbody>
                </Table>
                <Form addEvent={(e) => this.addEvent(e)}/>
            </div>
        );
    }
}

export default EventList;

