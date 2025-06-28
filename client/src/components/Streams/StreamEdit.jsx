import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';
import withParams from '../../utils/withParams';

class StreamEdit extends Component {

    componentDidMount() {
        const { params, match } = this.props;
        const id = params?.id || match?.params?.id;
        this.props.fetchStream(id);
    }

    onSubmit = (formValues) => {
        const { params, match } = this.props;
        const id = params?.id || match?.params?.id;
        this.props.editStream(id, formValues);
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
    const id = ownProps.params?.id || ownProps.match?.params?.id;
    return {
        stream: state.streams[id],
        currentUserId: state.auth.userId
    };
};

export default withParams(connect(
    mapStateToProps,
    {
        fetchStream,
        editStream
    }
)(StreamEdit));
