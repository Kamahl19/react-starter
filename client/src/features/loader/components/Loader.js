import React, { PropTypes } from 'react';
import { Loader as ReactLoaders } from 'react-loaders';

import 'loaders.css/src/animations/ball-spin-fade-loader.scss';
import './loader.scss';

const Loader = ({ show }) => {
  if (!show) {
    return <div />;
  }

  return (
    <div className="loader-overlay">
      <ReactLoaders
        type="ball-spin-fade-loader"
      />
    </div>
  );
};

Loader.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Loader;
