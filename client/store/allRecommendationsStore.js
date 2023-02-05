import Axios from "axios";

const SET_RECOMMENDATIONS ="SET_RECOMMENDATIONS"
const CREATE_RECOMMENDATION = "CREATE_RECOMMENDATION"
const DELETE_RECOMMENDATION = "DELETE_RECOMMENDATION"


export const setRecommendations = (shows) =>{
  return{
    type: SET_RECOMMENDATIONS,
    shows
  }
};

const _createRecommendation = (show) => {
  return {
    type: CREATE_RECOMMENDATION,
    show,
  };
};

const _deleteRecommendation = (show) => {
  return {
    type: DELETE_RECOMMENDATION,
    show
  };
};

export const fetchRecommendations = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/recommendations");
        dispatch(setRecommendations(data));
  };
};

export const createRecommendation = (show) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/recommendations", show);
    dispatch(_createRecommendation(created));
    // history.push("/recommendations");
  };
};

export const deleteRecommendation = (id, history) => {
  return async (dispatch) => {
    const { data: show } = await Axios.delete(`/api/recommendations/${id}`);
    dispatch(_deleteRecommendation(show));
    history.push("/recommendations");
  };
};


const initialState = [];
export default function recommendationsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RECOMMENDATIONS:
      return action.shows;
      case CREATE_RECOMMENDATION:
        return [...state, action.show];
        case DELETE_RECOMMENDATION:
      return state.filter((show) => show.id !== action.show.id)
      ;
      default:
        return state;
    }
  }
