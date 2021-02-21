import { TEXT_EDITOR } from '../constants/actionTypes';

const initialState = {
  description: '',
};

const textEditorReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEXT_EDITOR:
      return {
        ...initialState,
        description: action.description,
      };
    default:
      return state;
  }
};

export default textEditorReducer;
