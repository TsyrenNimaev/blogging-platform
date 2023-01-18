/* eslint-disable array-callback-return */
import React, { FC, useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import { ArticleList } from '../../store/type';
import defaultImg from '../../assets/img/defaultImg.png';

import classes from './Article.module.scss';

const Article: FC<ArticleList> = ({ title, description, tagList, author, slug, updatedAt }) => {
  const formatedDate = format(new Date(updatedAt), 'MMM d, yyyy');
  const cutTitle = title.length > 20 ? title.slice(0, 20).concat('...') : title;
  const cutDescription =
    description.split(' ').length > 50 ? description.split(' ').slice(0, 50).join(' ').concat('...') : description;
  const [errorImg, setErrorImg] = useState(false);
  // eslint-disable-next-line consistent-return, @typescript-eslint/no-explicit-any
  const tags = tagList.map((tag: string): any => {
    if (tag.length < 20) {
      return (
        <span key={Math.random()} className={classes.article__tag}>
          {tag}
        </span>
      );
    }
  });

  return (
    <>
      <div className={classes.article}>
        <h2>
          <Link className={classes.article__title} to={`/articles/${slug}`}>
            {cutTitle}
          </Link>
        </h2>
        {tags}
        <p className={classes.article__description}>{cutDescription}</p>
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

export default Article;
