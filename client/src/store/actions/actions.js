import {
	IMAGE,
	AUDIO,
	AUDIO_DURATION,
	AUDIO_LENGTH,
	AUDIO_TYPE,
	TEXT_EDITOR,
	LOGIN,
	LOGOUT,
} from "../constants/actionTypes";

export function getImage(uri) {
	return { type: IMAGE, uri: uri };
}

export function getAudio(uri) {
	return { type: AUDIO, uri: uri };
}

export function getAudioDuration(duration) {
	return { type: AUDIO_DURATION, duration: duration };
}

export function getAudioLength(length) {
	return { type: AUDIO_LENGTH, length: length };
}

export function getAudioType(audiotype) {
	return { type: AUDIO_TYPE, audiotype: audiotype };
}

export function getDescription(description) {
	return { type: TEXT_EDITOR, description: description };
}

export function authenticate() {
	return { type: LOGIN };
}

export function unauthenticate() {
	return { type: LOGOUT };
}
