import React, { Component } from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import moment from 'moment';

class Form extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: '',
            startTime: '',
            endTime:''
        };
    }

    validateTitle() {
        const length = this.state.title.length;
        if (length > 0) return 'success';
        else return 'error';
    }

    validateStartTime() {
        if ( moment(this.state.startTime, "M/D/YYYY h:mmA").isValid() )
            return 'success';
        else return 'error';
    }

    validateEndTime() {
        if ( moment(this.state.endTime, "M/D/YYYY h:mmA").isValid()
            && moment(this.state.endTime).valueOf() >= moment(this.state.startTime).valueOf() ) return 'success';
        else return 'error';
    }

    isDisabled() {
        if (this.validateTitle() === 'error'
            || this.validateStartTime() === 'error'
            || this.validateEndTime() === 'error') return true;
         else return false
    }

    handleTitle(e) {
        this.setState({ title: e.target.value });
    }

    handleStart(e) {
        this.setState({ startTime: e.target.value });
    }

    handleEnd(e) {
        this.setState({ endTime: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        let newEvent = {
            title: this.state.title,
            start_time: this.state.startTime,
            end_time: this.state.endTime
        }

        this.props.addEvent(newEvent);
    }

    render() {
        const disabled = this.isDisabled()
        return (
            <form>
                <FormGroup
                  validationState={this.validateTitle()}
                >
                    <ControlLabel>Title</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.title}
                        placeholder="Enter title"
                        onChange={(e) => this.handleTitle(e)}
                    />
                    <FormControl.Feedback />
                </FormGroup>
                <FormGroup
                  validationState={this.validateStartTime()}
                >
                    <ControlLabel>Start Time</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.startTime}
                        placeholder="Enter start date. e.g. 1/20/2017"
                        onChange={(e) => this.handleStart(e)}
                    />
                    <FormControl.Feedback />
                </FormGroup>
                <FormGroup
                  validationState={this.validateEndTime()}
                >
                    <ControlLabel>End Time</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.endTime}
                        placeholder="Enter end date. e.g.  1/21/2017"
                        onChange={(e) => this.handleEnd(e)}
                    />
                    <FormControl.Feedback />
                </FormGroup>
                <Button
                    type="submit"
                    onClick={(e) => this.handleSubmit(e)}
                    disabled={disabled}>
                    Create New Event
                </Button>
            </form>
        );
    }
}

export default Form;
