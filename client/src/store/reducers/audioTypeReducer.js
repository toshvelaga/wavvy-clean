import { AUDIO_TYPE } from '../constants/actionTypes';

const initialState = {
  audiotype: '',
};

const audioTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUDIO_TYPE:
      return {
        ...initialState,
        audiotype: action.audiotype,
      };
    default:
      return state;
  }
};

export default audioTypeReducer;
