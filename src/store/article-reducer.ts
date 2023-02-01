import { ArticleState, GetActionType, GetCombineType } from './action';

const initialState: ArticleState = {
  articleList: [],
  totalPages: 0,
  loading: false,
  offset: 0,
  errors: false,
  markdownPage: [],
  createPage: [],
  like: [],
};

const articleReducer = (state = initialState, action: GetCombineType): ArticleState => {
  switch (action.type) {
    case GetActionType.SUCCESS_LOAD: {
      return {
        ...state,
        articleList: action.payload,
        totalPages: action.totalPages,
        loading: false,
        errors: false,
      };
    }
    case GetActionType.ERROR_LOAD: {
      return { ...state, errors: action.payload };
    }
    case GetActionType.PAGINATION: {
      return { ...state, loading: true, offset: action.offset };
    }
    case GetActionType.GET_SINGLEPAGE: {
      return { ...state, markdownPage: action.payload, loading: false };
    }
    case GetActionType.CREATE_ARTICLE: {
      return { ...state, createPage: action.payload, loading: action.loading };
    }
    case GetActionType.EDIT_ARTICLE: {
      return { ...state, createPage: action.payload, loading: true };
    }
    case GetActionType.DELETE_ARTICLE: {
      return { ...state, loading: true };
    }
    case GetActionType.LIKE_POST: {
      return { ...state, like: action.payload };
    }
    case GetActionType.UNLIKE_POST: {
      return { ...state, like: action.payload };
    }
    default:
      return state;
  }
};

export default articleReducer;
