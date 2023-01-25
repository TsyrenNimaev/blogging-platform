import { AutorizationState, GetActionType, GetCombineType } from './action';

const initialState: AutorizationState = {
  user: null,
  error: null,
  article: null,
  isLoged: false,
};

const AutorizationReducer = (state = initialState, action: GetCombineType): AutorizationState => {
  switch (action.type) {
    case GetActionType.REGISTRATION: {
      return {
        ...state,
        user: action.payload,
        error: action.error,
        isLoged: action.isLoged,
      };
    }
    case GetActionType.LOGIN: {
      return {
        ...state,
        user: action.payload,
        error: action.error,
        isLoged: action.isLoged,
      };
    }
    case GetActionType.SET_LOGIN: {
      return {
        ...state,
        user: action.payload,
        isLoged: action.isLoged,
      };
    }
    case GetActionType.LOGOUT: {
      return {
        ...state,
        isLoged: action.isLoged,
      };
    }
    default:
      return state;
  }
};

export default AutorizationReducer;
