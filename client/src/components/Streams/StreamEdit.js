import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    };

    render() {
        if (this.props.stream && (this.props.currentUserId === this.props.stream.userId)) {
            return (
                <div className="ui container" style={{ marginTop: '10px' }}>
                    <h3>Edit a Stream</h3>
                    <StreamForm
                        initialValues={_.pick(this.props.stream, 'title', 'description')}
                        onSubmit={this.onSubmit}
                    />
                </div>
            );
        } else if (this.props.stream && this.props.currentUserId && (this.props.currentUserId !== this.props.stream.userId)) {
            return (
                <div className="ui container" style={{ marginTop: '50px' }}>
                    <div style={{ textAlign: 'center', fontSize: '20px' }}>Unauthorised.</div>
                </div>
            );
        } else {
            return (
                <div className="ui active center loader"></div>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id],
        currentUserId: state.auth.userId
    }
};

export default connect(
    mapStateToProps,
    {
        fetchStream,
        editStream
    }
)(StreamEdit);