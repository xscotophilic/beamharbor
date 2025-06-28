import React from 'react';
import { useForm } from 'react-hook-form';

const StreamForm = ({ onSubmit, initialValues = {} }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialValues.title ?? '',
      description: initialValues.description ?? '',
    },
  });

  const submit = (data) => onSubmit(data);

  return (
    <form onSubmit={handleSubmit(submit)} className="ui form error">
      <div className={`field ${errors.title ? 'error' : ''}`}>
        <label>Enter Title</label>
        <input {...register('title', { required: 'You must enter a title.' })} />
        {errors.title && (
          <div className="ui error message">
            <div className="header">{errors.title.message}</div>
          </div>
        )}
      </div>

      <div className={`field ${errors.description ? 'error' : ''}`}>
        <label>Enter Description</label>
        <input
          {...register('description', {
            required: 'You must enter a description.',
          })}
        />
        {errors.description && (
          <div className="ui error message">
            <div className="header">{errors.description.message}</div>
          </div>
        )}
      </div>

      <button className="ui button primary">Submit</button>
    </form>
  );
};

export default StreamForm;
