import React, { Component } from 'react';
import withParams from '../../utils/withParams';
import { connect } from 'react-redux';
import flv from 'flv.js';

import { fetchStream } from '../../actions';

class StreamShow extends Component {

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchStream(id);
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    buildPlayer() {
        if (this.player || !this.props.stream) {
            return;
        }
        const { id } = this.props.match.params;
        this.player = flv.createPlayer({
            type: 'flv',
            url: `${import.meta.env.VITE_STREAMER_BASE_URL}/live/${id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    render() {
        if (!this.props.stream) {
            return (
                <div className="ui active center loader"></div>
            );
        }
        const { stream, currentUserId, isSignedIn } = this.props;
        const isOwner = isSignedIn && stream.userId === currentUserId;
        const rtmpBase = import.meta.env.VITE_RTMP_SERVER_URL;
        return (
            <div className="ui container" style={{ marginTop: '10px' }}>
                <h3>{stream.title}</h3>
                <p>{stream.description}</p>
                <video ref={this.videoRef} style={{ width: '100%' }} controls />
                {isOwner && (
                    <div style={{ marginTop: '10px', color: 'grey', fontStyle: 'italic' }}>
                        You can stream your video at <code>{`${rtmpBase}/live/${stream.id}`}</code>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id],
        isSignedIn: state.auth.isSignedIn,
        currentUserId: state.auth.userId
    }
};

const ConnectedStreamShow = connect(
    mapStateToProps,
    {
        fetchStream
    }
)(StreamShow);

export default withParams(ConnectedStreamShow);
