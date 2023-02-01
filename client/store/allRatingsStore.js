import Axios from "axios";

const SET_RATINGS ="SET_RATINGS"
const CREATE_RATING = "CREATE_RATING"
const DELETE_RATING = "DELETE_RATING"


export const setRatings = (shows) =>{
  return{
    type: SET_RATINGS,
    shows
  }
};

const _createRating = (show) => {
  return {
    type: CREATE_RATING,
    show,
  };
};

const _deleteRating = (show) => {
  return {
    type: DELETE_RATING,
    show
  };
};

export const fetchRatings = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/ratings");
        dispatch(setRatings(data));
  };
};

export const createRating = (show, history) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/ratings", show);
    dispatch(_createRating(created));
    history.push("/ratings");
  };
};

export const deleteRating = (id, history) => {
  return async (dispatch) => {
    const { data: show } = await Axios.delete(`/api/ratings/${id}`);
    dispatch(_deleteRating(show));
    history.push("/ratings");
  };
};


const initialState = [];
export default function ratingsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RATINGS:
      return action.shows;
      case CREATE_RATING:
        return [...state, action.show];
        case DELETE_RATING:
      return state.filter((show) => show.id !== action.show.id)
      ;
      default:
        return state;
    }
  }
