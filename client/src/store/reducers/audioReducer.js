import { AUDIO } from '../constants/actionTypes';

const initialState = {
  audio: null,
};

const audioReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUDIO:
      return {
        ...initialState,
        audio: action.uri,
      };
    default:
      return state;
  }
};

export default audioReducer;
