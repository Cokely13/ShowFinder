import axios from "axios"

// Action Types
const SET_SINGLE_RECOMMENDATION = "SET_SINGLE_RECOMMENDATION";
const UPDATE_SINGLE_RECOMMENDATION = "UPDATE_SINGLE_RECOMMENDATION";


// Action creators
export const _setSingleRecommendation= (recommendationdata) => {
  return {
    type: SET_SINGLE_RECOMMENDATION,
    recommendationdata,
  };
};

const _updateSingleRecommendation = (recommendationdata) => {
  return {
    type: UPDATE_SINGLE_RECOMMENDATION,
    recommendationdata,
  };
};

//Thunks
export const fetchRecommendation = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/recommendations/${id}`);
    dispatch(_setSingleRecommendation(data));
  };
};

export const updateSingleRecommendation = (recommendation) => {
  return async (dispatch) => {
    try {
        await axios.put(`/api/recommendations/${recommendation.id}`, recommendation);
        const { data: recommendationData } = await axios.get(`/api/recommendations/${recommendation.id}`);
        dispatch(_updateSingleRecommendation(recommendationData));
        // history.push(`/myshows}`)
      }
     catch (error) {
      console.log("ERROR RECOMMENDATION", error)
    }
  };
};

// reducer
const initialState = [];
const singleRecommendationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_RECOMMENDATION:
      return action.recommendationdata;
    case UPDATE_SINGLE_RECOMMENDATION:
      return action.recommendationdata;
    default:
      return state;
  }
};

export default singleRecommendationReducer;
