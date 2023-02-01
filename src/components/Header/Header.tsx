/* eslint-disable multiline-ternary */
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../services/servic-api';
import { RootState, useAppSelector } from '../../store/root-reducer';
import defaultImg from '../../assets/img/defaultImg.png';

import classes from './Header.module.scss';

interface IHeaderType {
  state: RootState;
  setLogin: () => void;
  logout: () => void;
}

const Header: FC<IHeaderType> = ({ setLogin, logout }) => {
  const currentUser = useAppSelector((state) => state.AutorizationReducer.user);
  const isLogedin = useAppSelector((state) => state.AutorizationReducer.isLoged);

  useEffect(() => {
    setLogin();
  }, []);

  const setImg = currentUser?.user.image ? currentUser?.user.image : defaultImg;
  return (
    <header className={classes.header}>
      <Link to="/">Realworld Blog</Link>
      {!isLogedin ? (
        <div>
          <Link to="sing-in">Sign In</Link>
          <Link to="sing-up">Sign Up</Link>
        </div>
      ) : (
        <div>
          <Link to="/new-article" title="Create new article" className={classes.link_create}>
            Create article
          </Link>
          <Link className={classes.profile_user} to="/profile">
            <span>{currentUser?.user.username}</span>
            <img src={setImg} alt="user-logo" />
          </Link>
          <button className={classes['btn-logout']} onClick={logout}>
            Log Out
          </button>
        </div>
      )}
    </header>
  );
};

const mapStateProps = (state: RootState) => {
  return { state };
};

export default connect(mapStateProps, actions)(Header);
