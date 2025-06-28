import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function withNavigate(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return React.createElement(Component, { ...props, navigate });
  };
}
