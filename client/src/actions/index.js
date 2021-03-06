import axios from 'axios';
import { FETCH_USER, SEARCH_NAME } from './types';

//async dispatch is a function
export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const searchBar = (name) => {
	return (dispatch) => {
		axios.get('http://localhost:8080/testGoApi', {
			params: {
				name
			}
		})
			.then(({ data }) => {
				dispatch({
					type:SEARCH_NAME,
					payload: data
				})
			})
	}
};