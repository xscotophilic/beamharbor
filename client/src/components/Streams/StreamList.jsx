import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends Component {

    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdmin = (stream) => {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
                </div>
            );
        }
    };

    renderCards = () => {
        return this.props.streams.map(stream => {
            return (
                <div
                    className="ui card"
                    key={stream.id}
                    style={{ margin: '1em', flex: '1 1 300px' }}
                >
                    <Link to={`/streams/${stream.id}`} className="content" style={{ display: 'block', color: '#000' }}>
                        <i className="big middle aligned icon camera" style={{ float: 'right' }} />
                        <div className="header" style={{ color: '#000', fontWeight: 'bold' }}>
                            {stream.title}
                        </div>
                                                <div className="description" style={{ marginTop: '6px' }}>
                            {stream.description}
                        </div>
                    </Link>
                    {stream.userId === this.props.currentUserId && (
                        <div className="extra content" style={{ textAlign: 'right' }}>
                            <Link to={`/streams/edit/${stream.id}`} className="ui tiny button primary">Edit</Link>
                            <Link to={`/streams/delete/${stream.id}`} className="ui tiny button negative">Delete</Link>
                        </div>
                    )}
                </div>
            );
        });
    };


    render() {
        return (
            <div className="ui container" style={{ marginTop: '10px' }}>
                <h2>Streams</h2>
                <div className="ui link cards" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
                    {this.renderCards()}
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(
    mapStateToProps,
    {
        fetchStreams
    }
)(StreamList);