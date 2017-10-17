import { SEARCH_NAME } from '../actions/types';


const INITIAL_STATE = {
	results: null
}

export default function(state = INITIAL_STATE, action) {
	// console.log(action);
	switch(action.type) {
		case SEARCH_NAME:
			return {...state, results: action.payload};
		default: 
			return state;
	}
}