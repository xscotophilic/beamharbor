import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchStream } from '../../actions';

class StreamShow extends Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    render() {
        if (!this.props.stream || (this.props.isSignedIn === null)) {
            return (
                <div className="ui active center loader"></div>
            );
        }
        return (
            <div className="ui container" style={{ marginTop: '10px' }}>
                <h3>{this.props.stream.title}</h3>
                {this.props.stream.description}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id], isSignedIn: state.auth.isSignedIn }
};

export default connect(
    mapStateToProps,
    {
        fetchStream
    }
)(StreamShow);