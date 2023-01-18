// import { ArticleState } from './type';
import { ArticleState, GetActionType, GetCombineType } from './action';

const initialState: ArticleState = {
  articleList: [],
  totalPages: 0,
  loading: false,
  offset: 0,
  errors: false,
  markdownPage: [],
};

const articleReducer = (state = initialState, action: GetCombineType): ArticleState => {
  switch (action.type) {
    case GetActionType.SUCCESS_LOAD: {
      return {
        ...state,
        articleList: [...action.payload],
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
      return { ...state, markdownPage: action.payload };
    }
    default:
      return state;
  }
};

export default articleReducer;
