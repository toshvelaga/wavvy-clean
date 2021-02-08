import { AUDIO_LENGTH } from "../constants/actionTypes";

const initialState = {
	length: 0,
};

const audioLengthReducer = (state = initialState, action) => {
	switch (action.type) {
		case AUDIO_LENGTH:
			return {
				...initialState,
				length: action.length,
			};
		default:
			return state;
	}
};

export default audioLengthReducer;
