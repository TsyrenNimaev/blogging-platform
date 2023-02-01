/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { FC, useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

import { ArticleList } from '../../store/type';
import * as actions from '../../services/servic-api';
import { RootState, AppDispatch } from '../../store/root-reducer';
import defaultImg from '../../assets/img/defaultImg.png';

import classes from './Article.module.scss';

const Article: FC<ArticleList> = ({
  title,
  description,
  tagList,
  author,
  favoritesCount,
  favorited,
  slug,
  updatedAt,
}) => {
  const formatedDate = format(new Date(updatedAt), 'MMM d, yyyy');
  const cutTitle = title.length > 20 ? title.slice(0, 20).concat('...') : title;
  const [errorImg, setErrorImg] = useState(false);
  const tags = tagList.map((tag: string): any => {
    if (tag.length < 20 && tag !== null) {
      return (
        <span key={Math.random()} className={classes.article__tag}>
          {tag}
        </span>
      );
    }
  });

  const dispatch: AppDispatch = useDispatch();

  const onLike = () => {
    if (slug !== undefined) {
      if (!favorited) {
        dispatch(actions.likePost(slug));
      } else {
        dispatch(actions.unlikePost(slug));
      }
    }
  };

  return (
    <>
      <div className={classes.article}>
        <h2 className={classes.article__title}>
          <Link className={classes.article__link} to={`/articles/${slug}`}>
            {cutTitle}
          </Link>
          <div className={classes.like__container}>
            <span onClick={onLike} className={favorited ? classes.liked : classes.unliked}></span>
            <span className={classes.like_count}>{favoritesCount}</span>
          </div>
        </h2>
        {tags}
        <p className={classes.article__description}>{description}</p>
      </div>
      <div className={classes.author}>
        <span className={classes.author__username}>
          {author.username}
          <span className={classes.author__date}>{formatedDate}</span>
        </span>
        <img
          src={errorImg ? defaultImg : author.image}
          onError={() => setErrorImg(true)}
          alt="author"
          className={classes.author__img}
        />
      </div>
    </>
  );
};

const mapStateProps = (state: RootState) => {
  return { state };
};

export default connect(mapStateProps, actions)(Article);
