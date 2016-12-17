import React, { Component } from 'react';

import './Search.css';

class Search extends Component {
    render() {
        return (
        <div className="Search">
            <p>Search Event</p>
            <input
                type="text"
                value={this.props.search}
                onChange={this.props.onSearch}
            />
        </div>
        );
    }
}

export default Search;
