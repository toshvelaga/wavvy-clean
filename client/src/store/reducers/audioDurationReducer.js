import { AUDIO_DURATION } from "../constants/actionTypes";

const initialState = {
	duration: 0,
};

const audioDurationReducer = (state = initialState, action) => {
	switch (action.type) {
		case AUDIO_DURATION:
			return {
				...initialState,
				duration: action.duration,
			};
		default:
			return state;
	}
};

export default audioDurationReducer;
