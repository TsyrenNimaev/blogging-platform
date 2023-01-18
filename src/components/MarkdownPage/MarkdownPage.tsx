import React, { FC, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import uniqid from 'uniqid';

import * as actions from '../../services/servic-api';
import { RootState } from '../../store/root-reducer';
import defaultImg from '../../assets/img/defaultImg.png';

import classes from './MarkdownPage.module.scss';

interface Markdown {
  state: RootState;
  getSinglePage: (slug: string) => void;
  slug: string;
}

const MarkdownPage: FC<Markdown> = ({ getSinglePage, state, slug }) => {
  const [ErrorImg, setErrorImg] = useState(false);
  const item = state.articleReducer.markdownPage;

  useEffect(() => {
    getSinglePage(slug);
  }, [slug]);

  if (item.length === 0) return null;
  // eslint-disable-next-line array-callback-return, consistent-return, @typescript-eslint/no-explicit-any
  const tags = item.tagList.map((tag: string): any => {
    if (tag.length < 20) {
      return (
        <span key={uniqid()} className={classes.tag}>
          {tag}
        </span>
      );
    }
  });

  const formatedDate = format(new Date(item.updatedAt), 'MMM d, yyyy');

  return (
    <div className={classes.markdown}>
      <div className={classes.markdown__title}>
        <div>
          <h3 className={classes.title}>{item.title}</h3>
          <span>{tags}</span>
        </div>
        <div>
          <span>
            {item.author.username}
            <span>{formatedDate}</span>
          </span>
          <img src={ErrorImg ? defaultImg : item.author.image} onError={() => setErrorImg(true)} alt="author" />
        </div>
      </div>
      <ReactMarkdown>{item.body}</ReactMarkdown>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return { state };
};

export default connect(mapStateToProps, actions)(MarkdownPage);
