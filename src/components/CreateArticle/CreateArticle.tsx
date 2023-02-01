/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { any, number, string } from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as actions from '../../services/servic-api';
import { RootState, useAppSelector } from '../../store/root-reducer';
import { ArticleRequestType, IFormCreate } from '../../store/type';
import Loader from '../Loader';

import classes from './CreateArticle.module.scss';

interface PropsType {
  editArticle: (slug: string, postData: ArticleRequestType) => void;
  getSinglePage: (slug: string) => void;
  createArticle: (postData: ArticleRequestType) => void;
  slug: string;
}

const CreateArticle = (props: PropsType): any => {
  const histoty = useHistory();
  const { slug, createArticle, editArticle } = props;
  // const load = state.articleReducer.loading;
  const editTitle = slug ? useAppSelector((state) => state.articleReducer.markdownPage.title) : '';
  const editDescription = slug ? useAppSelector((state) => state.articleReducer.markdownPage.description) : '';
  const editBody = slug ? useAppSelector((state) => state.articleReducer.markdownPage.body) : '';
  const editTags = slug ? useAppSelector((state) => state.articleReducer.markdownPage.tagList) : '';
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IFormCreate>({
    mode: 'onBlur',
    defaultValues: { title: editTitle, description: editDescription, body: editBody, tagList: editTags },
  });

  const onSubmit: SubmitHandler<IFormCreate> = (data) => {
    const postData: any = {
      article: { title: data.title, description: data.description, body: data.body, tagList: data.tagList },
    };

    if (slug !== undefined) {
      editArticle(slug, postData);
    } else {
      createArticle(postData);
    }
    // reset();
  };

  const [redirect, setRedirect] = useState(false);
  const [tagList, setTagList] = useState([{ tag: '' }]);
  // useEffect(() => {
  //   setRedirect(false);
  //   return () => histoty.replace('/');
  // }, [onSubmit]);

  // const handleTagChange = (e: any, index: any) => {
  //   const { name, value } = e.target;
  //   const list = [...tagList];
  //   list[index][name]: any = value;
  // };

  const handleTagAdd = () => {
    setTagList([...tagList, { tag: '' }]);
  };

  const handleTagRemove = (index: number) => {
    const list = [...tagList];
    list.splice(index, 1);
    setTagList(list);
  };

  const showLoader = redirect ? <Loader /> : null;

  return (
    <>
      {showLoader || (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.createForm} autoComplete="off">
          <>
            <h3 className={classes.createForm__title}>{slug ? 'Edit article' : 'Create new article'}</h3>
            <label className={classes.createForm__label}>
              Title
              <input
                {...register('title', {
                  required: 'Please enter title',
                  minLength: {
                    value: 1,
                    message: 'You must specify at least one character',
                  },
                })}
                type="text"
                className={classes.createForm__input}
                placeholder="Title"
              />
            </label>
            <div className={classes.form__errors}>{errors?.title && <span>{errors?.title?.message}</span>}</div>
            <label className={classes.createForm__label}>
              Short description
              <input
                {...register('description', {
                  required: 'Please enter description',
                  minLength: {
                    value: 1,
                    message: 'You must specify at least one character',
                  },
                })}
                type="text"
                className={classes.createForm__input}
                placeholder="Title"
              />
            </label>
            <div className={classes.form__errors}>
              {errors?.description && <span>{errors?.description?.message}</span>}
            </div>
            <label className={classes.createForm__label}>
              Text
              <textarea
                {...register('body', {
                  required: 'Please enter text',
                  minLength: {
                    value: 1,
                    message: 'You must specify at least one character',
                  },
                })}
                className={classes.textarea}
                placeholder="Text"
                rows={10}
              />
            </label>
            <div className={classes.form__errors}>{errors?.body && <span>{errors?.body?.message}</span>}</div>
            <div className={classes.tag_list}>
              <label htmlFor="tag" className={classes.createForm__label}>
                Tags
              </label>
              {tagList.map((singleTag, index) => (
                <div key={index} className={classes.tag_container}>
                  <input
                    {...register('tagList', { required: false })}
                    type="text"
                    className={classes.createForm_tag}
                    placeholder="Tag"
                  />
                  {tagList.length !== 1 && (
                    <button
                      type="button"
                      className={`${classes.create_btn} ${classes.btn_delete}`}
                      onClick={() => handleTagRemove(index)}
                    >
                      Delete
                    </button>
                  )}
                  <div className={classes.add_container}>
                    {tagList.length - 1 === index && (
                      <button
                        type="button"
                        className={`${classes.create_btn} ${classes.btn_add}`}
                        onClick={handleTagAdd}
                      >
                        Add tag
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button type="submit" className={classes.form_btn} disabled={!isValid}>
              Send
            </button>
          </>
        </form>
      )}
    </>
  );
};

const mapStateProps = (state: RootState) => {
  return { state };
};

export default connect(mapStateProps, actions)(CreateArticle);
// import React, { FC, useEffect, useState } from 'react';
// import { connect } from 'react-redux';
// import { Button, Form, Input } from 'antd';
// import { useHistory } from 'react-router-dom';

// import { useAppSelector, RootState } from '../../store/root-reducer';
// import * as actions from '../../services/servic-api';
// import { ArticleRequestType } from '../../store/type';

// interface PropsType {
//   editArticle: (slug: string, postData: ArticleRequestType) => void;
//   getSinglePage: (slug: string) => void;
//   createArticle: (postData: ArticleRequestType) => void;
//   slug: string;
// }

// const CreateArticle = (props: PropsType): any => {
//   const [redirect, setRedirect] = useState(false);
//   const { editArticle, getSinglePage, createArticle, slug } = props;
//   const editTitle = useAppSelector((state) => state.articleReducer.markdownPage.title);
//   const editDescription = useAppSelector((state) => state.articleReducer.markdownPage.description);
//   const editBody = useAppSelector((state) => state.articleReducer.markdownPage.body);
//   const editTags = useAppSelector((state) => state.articleReducer.markdownPage.tagList);
//   const [form] = Form.useForm();
//   const history = useHistory();

//   const onFinish = (value: any) => {
//     const postData: ArticleRequestType = {}
//   }
// };

// const mapStateProps = (state: RootState) => {
//   return { state };
// };

// export default connect(mapStateProps, actions)(CreateArticle);
