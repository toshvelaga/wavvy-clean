import { LOGIN, LOGOUT } from "../constants/actionTypes";

const initialState = {
	isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...initialState,
				isAuthenticated: true,
			};
		case LOGOUT:
			return {
				...initialState,
				isAuthenticated: false,
			};
		default:
			return state;
	}
};

export default authReducer;
