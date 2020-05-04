const axios = require('axios');
const initialState = {
  media: {},
  clicks: {},
  error: {},
};

//FORMS
const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS';
const CLEAR_SERACH_RESULTS = 'CLEAR_SERACH_RESULTS';
const SET_ERROR = 'SET_ERROR';

export const getSearchResults = (search) => {
  return async (dispatch) => {
    try {
      const searchResults = await axios.post('/api/search_videos', {
        search: search,
      });
      return dispatch({
        type: GET_SEARCH_RESULTS,
        data: searchResults.data,
      });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        error: error.response.data.message,
      });
      throw new Error(error);
    }
  };
};

export const clearSearch = () => {
  return (dispatch) => {
    return dispatch({
      type: CLEAR_SERACH_RESULTS,
    });
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SEARCH_RESULTS:
      return { ...state, media: action.data };
    case CLEAR_SERACH_RESULTS:
      return { ...state, media: {} };
    case SET_ERROR:
      return { ...state, error: action.error };
  }
  return state;
};

export default reducer;
