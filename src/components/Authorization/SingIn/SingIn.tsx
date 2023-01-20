import React from 'react';
import { Link } from 'react-router-dom';

// import classes from './SingIn.module.scss';
import classes from '../Authorization.module.scss';

const SingIn = () => {
  return (
    <form className={classes.form}>
      <h3 className={classes.form__title}>Sign In</h3>
      <label className={classes.form__label}>
        Email address
        <input type="email" className={classes.form__input} placeholder="Email address" />
      </label>
      <label className={classes.form__label}>
        Password
        <input type="password" className={classes.form__input} placeholder="Password" />
      </label>
      <button className={classes.form__btn}>Login</button>
      <span>
        Don’t have an account? <Link to="sing-up">Sign Up.</Link>
      </span>
    </form>
  );
};

export default SingIn;
