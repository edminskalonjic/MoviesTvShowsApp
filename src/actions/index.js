import themoviedbAPI from '../API/themoviedb';
import {
    FETCH_ITEMS,
    FETCH_ITEM
} from './types';
import history from '../history';

export const fetchTopItems = type => async dispatch =>{
    const response = await themoviedbAPI(`/${type}/top_rated`);
    dispatch({type:FETCH_ITEMS, payload: {searchResults: response.data.results.slice(0,10), type}});
}

export const searchAndFetchItems = (query, type) => async dispatch =>{
    const response = await themoviedbAPI(`/search/${type}?query=${query}`);
    dispatch({type:FETCH_ITEMS, payload: {searchResults: response.data.results.slice(0,10), type}});
}

export const fetchItem = (id, type) => async dispatch => {
    const response = await themoviedbAPI(`/${type}/${id}?append_to_response=videos`);
    dispatch({type:FETCH_ITEM, payload:response.data});
    history.push(`/${type}/${id}`);
}



