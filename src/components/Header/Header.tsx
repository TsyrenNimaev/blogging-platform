/* eslint-disable multiline-ternary */
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, useParams, useHistory } from 'react-router-dom';

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
      <a href="#">Realworld Blog</a>
      {!isLogedin ? (
        <div>
          <Link to="sing-in">Sign In</Link>
          <Link to="sing-up">Sign Up</Link>
        </div>
      ) : (
        <div>
          <a className={classes.link_create}>Create article</a>
          <div>
            <span>{currentUser?.user.username}John Doe</span>
            <img src={setImg} alt="user-logo" />
          </div>
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
