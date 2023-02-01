import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import uniqid from 'uniqid';

import * as actions from '../../services/servic-api';
import { RootState } from '../../store/root-reducer';
import Paginations from '../Pagination';
import Article from '../Article';
import Loader from '../Loader';

import classes from './AppList.module.scss';

interface ArcticlePage {
  state: RootState;
  getContent: (offset: number) => void;
}

const AppList: FC<ArcticlePage> = ({ state, getContent }) => {
  const { offset } = state.articleReducer;

  useEffect(() => {
    getContent(offset);
  }, [offset, state.articleReducer.like.slug, state.articleReducer.like.favorited]);

  const articleList = state.articleReducer.articleList.map((el) => {
    return (
      <li key={uniqid()} className={classes['article-item']}>
        <Article
          title={el.title}
          description={el.description}
          tagList={el.tagList}
          author={el.author}
          slug={el.slug}
          updatedAt={el.updatedAt}
          favorited={el.favorited}
          favoritesCount={el.favoritesCount}
        />
      </li>
    );
  });

  const showLoader = state.articleReducer.loading ? <Loader /> : null;

  return (
    <div className={classes.container}>
      <ul className={classes['article-list']}>{showLoader || articleList}</ul>
      <Paginations totalItems={state.articleReducer.totalPages} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return { state };
};

export default connect(mapStateToProps, actions)(AppList);
