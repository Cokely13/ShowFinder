import axios from "axios"

// Action Types
const SET_SINGLE_RATING = "SET_SINGLE_RATING";
const UPDATE_SINGLE_RATING = "UPDATE_SINGLE_RATING";
const TOKEN = "token";

// Action creators
export const _setSingleRating= (ratingdata) => {
  return {
    type: SET_SINGLE_RATING,
    ratingdata,
  };
};

const _updateSingleRating = (ratingdata) => {
  return {
    type: UPDATE_SINGLE_RATING,
    ratingdata,
  };
};

//Thunks
export const fetchRating = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/ratings/${id}`);
    dispatch(_setSingleRating(data));
  };
};

export const updateSingleRating = (rating) => {
  return async (dispatch) => {
    try {
        await axios.put(`/api/ratings/${rating.id}`, rating);
        const { data: ratingData } = await axios.get(`/api/ratings/${rating.id}`);
        dispatch(_updateSingleRating(ratingData));
        // history.push(`/ratings/${rating.id}`)
      }
     catch (error) {
      console.log("RATING", rating)
    }
  };
};

// reducer
const initialState = [];
const singleRatingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_RATING:
      return action.ratingdata;
    case UPDATE_SINGLE_RATING:
      return action.ratingdata;
    default:
      return state;
  }
};

export default singleRatingReducer;
