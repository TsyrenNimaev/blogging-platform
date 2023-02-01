/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input } from 'antd';
import { useHistory } from 'react-router-dom';
import uniqid from 'uniqid';

import { useAppSelector, RootState } from '../../store/root-reducer';
import * as actions from '../../services/servic-api';
import { ArticleRequestType } from '../../store/type';
import Loader from '../Loader';

import classes from './CreateArticle.module.scss';

interface PropsType {
  editArticle: (slug: string, postData: ArticleRequestType) => void;
  getSinglePage: (slug: string) => void;
  createArticle: (postData: ArticleRequestType) => void;
  slug: string;
}

const CreateArticle = (props: PropsType): any => {
  const [redirect, setRedirect] = useState(false);
  const { editArticle, createArticle, slug } = props;
  const editTitle = useAppSelector((state) => state.articleReducer.markdownPage.title);
  const editDescription = useAppSelector((state) => state.articleReducer.markdownPage.description);
  const editBody = useAppSelector((state) => state.articleReducer.markdownPage.body);
  const editTags = useAppSelector((state) => state.articleReducer.markdownPage.tagList);
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = (values: any) => {
    const postData: ArticleRequestType = {
      article: { title: values.title, description: values.description, body: values.body, tagList: values.tagList },
    };
    if (slug !== undefined) {
      editArticle(slug, postData);
    } else {
      createArticle(postData);
    }
  };
  useEffect(() => {
    setRedirect(false);
    return () => history.replace('/');
  }, [onFinish]);

  const showLoader = redirect ? <Loader /> : null;

  return (
    <>
      {showLoader || (
        <Form form={form} name="register" onFinish={onFinish} className={classes.createForm} scrollToFirstError>
          <h3 className={classes.createForm__title}>{slug ? 'Edit article' : 'Create new article'}</h3>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter title', whitespace: true }]}
            initialValue={slug ? editTitle : null}
          >
            <Input placeholder="Title" style={{ width: '100%', height: '40px' }} />
          </Form.Item>
          <Form.Item
            name="description"
            label="Short description"
            rules={[{ required: true, message: 'Please enter description', whitespace: true }]}
            initialValue={slug ? editDescription : null}
          >
            <Input placeholder="Short description" style={{ width: '100%', height: '40px' }} />
          </Form.Item>
          <Form.Item
            name="body"
            label="Text"
            rules={[{ required: true, message: 'Please enter text', whitespace: true }]}
            initialValue={slug ? editBody : null}
          >
            <Input.TextArea placeholder="Text" rows={10} className={classes.createForm__textarea} />
          </Form.Item>
          <div className={classes.createForm__tags_form}>
            <Form.List name={'tagList'} initialValue={slug ? editTags : null}>
              {(fields, { add, remove }) => (
                <>
                  <div key={uniqid()}>
                    {fields.map((field) => (
                      <div key={field.key} className={classes.createForm__tags}>
                        <Form.Item
                          {...field}
                          className={classes.add_tag_field}
                          rules={[{ required: true, message: 'Please enter tag', whitespace: true }]}
                        >
                          <Input
                            placeholder="Tag"
                            style={{
                              height: '40px',
                              width: '300px',
                            }}
                          />
                        </Form.Item>
                        <Button
                          danger
                          className={`${classes.create_btn} ${classes.btn_delete}`}
                          onClick={() => remove(field.name)}
                        >
                          Delete
                        </Button>
                      </div>
                    ))}
                  </div>
                  <>
                    <Button onClick={() => add()} className={`${classes.create_btn} ${classes.btn_add}`}>
                      Add tags
                    </Button>
                  </>
                </>
              )}
            </Form.List>
          </div>
          <Form.Item>
            <Button className={classes.form_btn} type="primary" htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

const mapStateProps = (state: RootState) => {
  return { state };
};

export default connect(mapStateProps, actions)(CreateArticle);
