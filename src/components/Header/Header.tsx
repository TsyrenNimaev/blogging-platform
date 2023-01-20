import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Header.module.scss';

const Header = () => {
  return (
    <header className={classes.header}>
      <a href="#">Realworld Blog</a>
      <div>
        <Link to="sing-in">Sign In</Link>
        <Link to="sing-up">Sign Up</Link>
      </div>
    </header>
  );
};

export default Header;
