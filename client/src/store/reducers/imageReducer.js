import { IMAGE } from "../constants/actionTypes";

const initialState = {
	image: null,
};

const imageReducer = (state = initialState, action) => {
	switch (action.type) {
		case IMAGE:
			return {
				...initialState,
				image: action.uri,
			};
		default:
			return state;
	}
};

export default imageReducer;
