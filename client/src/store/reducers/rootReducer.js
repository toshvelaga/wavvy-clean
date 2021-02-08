import { combineReducers } from "redux";
import imageReducer from "./imageReducer";
import audioReducer from "./audioReducer";
import audioDurationReducer from "./audioDurationReducer";
import audioLengthReducer from "./audioLengthReducer";
import audioTypeReducer from "./audioTypeReducer";
import textEditorReducer from "./textEditorReducer";
import authReducer from "./authReducer";
// import interestReducer from "./interestReducer";

const rootReducer = combineReducers({
	// interestReducer,
	authReducer,
	audioReducer,
	audioDurationReducer,
	audioLengthReducer,
	audioTypeReducer,
	imageReducer,
	textEditorReducer,
});

export default rootReducer;
