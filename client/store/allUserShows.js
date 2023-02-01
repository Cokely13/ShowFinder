import Axios from "axios";

const SET_USERSHOWS ="SET_USERSHOWS"
const CREATE_USERSHOW = "CREATE_USERSHOW"
const DELETE_USERSHOW = "DELETE_USERSHOW"


export const setUserShows = (shows) =>{
  return{
    type: SET_USERSHOWS,
    shows
  }
};

const _createUserShow = (show) => {
  return {
    type: CREATE_USERSHOW,
    show,
  };
};

const _deleteUserShow = (show) => {
  return {
    type: DELETE_USERSHOW,
    show
  };
};

export const fetchUserShows = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/usershows");
        dispatch(setUserShows(data));
  };
};

export const createUserShow = (show, history) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/usershows", show);
    dispatch(_createUserShow(created));
    history.push("/usershows");
  };
};

export const deleteUserShow = (id, history) => {
  return async (dispatch) => {
    const { data: show } = await Axios.delete(`/api/usershows/${id}`);
    dispatch(_deleteUserShow(show));
    history.push("/usershows");
  };
};


const initialState = [];
export default function userShowsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERSHOWS:
      return action.shows;
      case CREATE_USERSHOW:
        return [...state, action.show];
        case DELETE_USERSHOW:
      return state.filter((show) => show.id !== action.show.id)
      ;
      default:
        return state;
    }
  }
