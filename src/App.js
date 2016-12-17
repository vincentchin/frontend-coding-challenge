import React, { Component } from 'react';

import Api from './constants/api';
import EventList from './components/EventList';

import 'whatwg-fetch';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            events: [],
        }
    }

    componentDidMount() {
        let resource = Api.url,
            obj = {
                headers: { 'Authorization': 'Token ' + Api.token }
            }

        fetch(resource, obj)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.setState({events: data.results})
            })
    }

    render() {
        return (
            <div className="App">
                <EventList events={this.state.events} />
            </div>
        );
    }
}

export default App;
