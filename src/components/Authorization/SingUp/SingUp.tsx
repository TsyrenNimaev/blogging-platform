import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import classes from '../Authorization.module.scss';

interface IFormInput {
  username: string;
  emailAddress: string;
  password: string | number | symbol;
  confirmPassword: string | number | number;
}

const SingUp = () => {
  const validationScheme = Yup.object().shape({
    username: Yup.string().required('Required field').min(2, 'You must specify at least two characters'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });
  // const formOptions = { resolver: yupResolver(validationScheme) };
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IFormInput>({ mode: 'onBlur', resolver: yupResolver(validationScheme) });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    reset();
  };

  // const invalid = [classes.form__input];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <h3 className={classes.form__title}>Create new account</h3>
      <label className={classes.form__label}>
        Username
        <input
          {...register('username', { required: true })}
          type="text"
          className={`${classes.form__input} ${errors.username ? classes.invalid : ''}`}
          placeholder="Username"
        />
      </label>
      <div className={classes.form__errors}>{errors?.username && <span>{errors?.username?.message}</span>}</div>
      <label className={classes.form__label}>
        Email address
        <input
          {...register('emailAddress', { required: true })}
          type="email"
          className={`${classes.form__input} ${errors.emailAddress ? classes.invalid : ''}`}
          placeholder="Email address"
        />
      </label>
      <label className={classes.form__label}>
        Password
        <input
          {...register('password', { required: true })}
          type="password"
          className={`${classes.form__input} ${errors.password ? classes.invalid : ''}`}
          placeholder="Password"
        />
      </label>
      <div className={classes.form__errors}>{errors.password?.message}</div>
      <label className={classes.form__label}>
        Repeat Password
        <input
          {...register('confirmPassword', { required: true })}
          type="password"
          className={`${classes.form__input} ${errors.confirmPassword ? classes.invalid : ''}`}
          placeholder="Repeat password"
        />
      </label>
      <div className={classes.form__errors}>{errors.confirmPassword?.message}</div>
      <label className={classes.form__label}>
        I agree to the processing of my personal information
        <input type="checkbox" className={classes.form__checkbox} required checked />
      </label>
      <button type="submit" className={classes.form__btn} disabled={!isValid}>
        Create
      </button>
      <span>
        Already have an account? <Link to="sing-in">Sign In.</Link>
      </span>
    </form>
  );
};

export default SingUp;
