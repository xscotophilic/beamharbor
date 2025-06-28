import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import withParams from '../../utils/withParams';

import history from '../../history';
import Modal from '../Modal';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends Component {

    componentDidMount() {
        const { params, match } = this.props;
        const id = params?.id || match?.params?.id;
        this.props.fetchStream(id);
    }

    renderActions = () => {
        const { params, match } = this.props;
        const id = params?.id || match?.params?.id;
        return (
            <React.Fragment>
                <button
                    onClick={() => this.props.deleteStream(id)}
                    className="ui button negative"
                >
                    Delete
                </button>
                <Link
                    className="ui button"
                    to='/'
                >
                    Cancle
                </Link>
            </React.Fragment>
        );
    };

    renderContent = () => {
        if (!this.props.stream) {
            return null;
        }
        return `Are you sure you want to delete stream with title: ${this.props.stream.title}`
    };

    render() {
        if (this.props.stream && this.props.currentUserId && (this.props.stream.userId === this.props.currentUserId)) {
            return (
                <Modal
                    title='Delete Stream'
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')}
                />
            );
        } else if (this.props.stream && this.props.currentUserId && (this.props.currentUserId !== this.props.stream.userId)) {
            return (
                <div className="ui container" style={{ marginTop: '50px' }}>
                    <div style={{ textAlign: 'center', fontSize: '20px' }}>Unauthorised.</div>
                </div>
            );
        }
        return (
            <div className="ui active center loader"></div>
        )
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
        deleteStream
    }
)(StreamDelete));
