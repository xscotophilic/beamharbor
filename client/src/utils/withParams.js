import React from 'react';
import { useParams } from 'react-router-dom';

// HOC that injects URL params into class components and also provides legacy `match.params`
export default function withParams(Component) {
  return function WrappedComponent(props) {
    const params = useParams();
    // provide both `params` and `match` for legacy code paths
    return React.createElement(Component, { ...props, params, match: { params } });
  };
}
