import React from 'react';

import classes from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={classes['loader-container']}>
      <div></div>
      <div></div>
      <div></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
