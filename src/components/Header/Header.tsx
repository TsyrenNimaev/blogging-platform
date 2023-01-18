import React from 'react';

import classes from './Header.module.scss';

const Header = () => {
  return (
    <header className={classes.header}>
      <a href="">Realworld Blog</a>
      <div>
        <a href="">Sign In</a>
        <a href="">Sign Up</a>
      </div>
    </header>
  );
};

export default Header;
