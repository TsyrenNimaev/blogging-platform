/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { FC, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import uniqid from 'uniqid';
import { message, Popconfirm } from 'antd';
import { useHistory, Link } from 'react-router-dom';

import * as actions from '../../services/servic-api';
import { RootState } from '../../store/root-reducer';
import defaultImg from '../../assets/img/defaultImg.png';

import classes from './MarkdownPage.module.scss';

interface Markdown {
  state: RootState;
  getSinglePage: (slug: string) => void;
  slug: string;
  deleteArticle: (slug: string) => void;
  likePost: (slug: string) => void;
  unlikePost: (slug: string) => void;
}

const MarkdownPage: FC<Markdown> = ({ getSinglePage, state, slug, deleteArticle, likePost, unlikePost }) => {
  const [ErrorImg, setErrorImg] = useState(false);
  const item = state.articleReducer.markdownPage;
  const userName = state.AutorizationReducer.user?.user.username;
  const authorName = state.articleReducer.markdownPage;
  const load = state.articleReducer.loading;
  const history = useHistory();

  useEffect(() => {
    getSinglePage(slug);
  }, [slug, state.articleReducer.like.favorited]);

  useEffect(() => {
    if (load) {
      actions.getContent();
      history.replace('/');
    }
  }, [load]);

  if (item.length === 0) return null;
  const tags =
    item.tagList !== null &&
    item.tagList.map((tag: string): any => {
      if (tag.length < 20) {
        return (
          <span key={uniqid()} className={classes.tag}>
            {tag}
          </span>
        );
      }

      return null;
    });

  const formatedDate = format(new Date(item.updatedAt), 'MMM d, yyyy');

  const confirm = () => {
    deleteArticle(slug);
    message.success('Successfully removed');
    actions.getContent();
  };

  const cancel = () => {
    message.error('Click on No');
  };

  const onLike = () => {
    if (!item.favorited) {
      likePost(slug);
    } else {
      unlikePost(slug);
    }
  };

  const buttonsEdit = (
    <div className={classes.edit_btns}>
      <Popconfirm
        title="Delete"
        description="Are you sure to delete this article?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
        placement="rightTop"
      >
        <button className={classes.delete_btn}>Delete</button>
      </Popconfirm>
      <Link className={classes.edit_btn} to={`/articles/${slug}/edit`}>
        Edit
      </Link>
    </div>
  );

  return (
    <div className={classes.markdown}>
      <div className={classes.markdown__title}>
        <div>
          <h3 className={classes.title}>{item.title}</h3>
          <div className={classes.like__container}>
            <span onClick={onLike} className={item.favorited ? classes.liked : classes.unliked}></span>
            <span className={classes.like_count}>{item.favoritesCount}</span>
          </div>
          <span className={classes.markdown__tag}>{tags}</span>
        </div>
        <div>
          <span className={classes.markdown__username}>
            {item.author.username}
            <span>{formatedDate}</span>
          </span>
          <img
            src={ErrorImg ? defaultImg : item.author.image}
            className={classes.markdown__img}
            onError={() => setErrorImg(true)}
            alt="author"
          />
          {userName === authorName.author.username ? buttonsEdit : null}
        </div>
      </div>
      <p className={classes.markdown__description}>{item.description}</p>
      <ReactMarkdown className={classes.markdown__body}>{item.body}</ReactMarkdown>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return { state };
};

export default connect(mapStateToProps, actions)(MarkdownPage);
