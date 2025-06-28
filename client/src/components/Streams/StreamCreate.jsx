import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends Component {

    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    };

    render() {
        if (this.props.isSignedIn) {
            return (
                <div className="ui container" style={{ marginTop: '15px' }}>
                    <h3>Create a Stream</h3>
                    <StreamForm onSubmit={this.onSubmit} />
                </div>
            );
        } else if (this.props.isSignedIn === null) {
            return (
                <div className="ui active center loader"></div>
            );
        } else if (!this.props.isSignedIn) {
            return (
                <div className="ui container" style={{ marginTop: '50px' }}>
                    <div style={{ textAlign: 'center', fontSize: '20px' }}>Login First.</div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
};

export default connect(
    mapStateToProps,
    {
        createStream
    }
)(StreamCreate);