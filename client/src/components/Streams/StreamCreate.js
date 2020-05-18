import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { createStream } from '../../actions';

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        errors.title = 'You must enter a title.';
    }
    if (!formValues.description) {
        errors.description = 'You must enter a description.';
    }
    return errors;
};
class StreamCreate extends Component {

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    };

    render() {
        return (
            <div>
                <form
                    onSubmit={this.props.handleSubmit(this.onSubmit)}
                    className="ui container form error"
                    style={{ marginTop: '20px' }}
                >
                    <Field name="title" component={this.renderInput} label="Enter Title" />
                    <Field name="description" component={this.renderInput} label="Enter Description" />
                    <button
                        className="ui button primary"
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

const formWrapped = reduxForm({
    form: 'CreateStream',
    validate
})(StreamCreate);

export default connect(
    null,
    {
        createStream
    }
)(formWrapped);