import Axios from "axios";

const SET_FRIENDS ="SET_FRIENDS"
const CREATE_FRIEND = "CREATE_FRIEND"
const DELETE_FRIEND = "DELETE_FRIEND"


export const setFriends = (shows) =>{
  return{
    type: SET_FRIENDS,
    shows
  }
};

const _createFriend = (show) => {
  return {
    type: CREATE_FRIEND,
    show,
  };
};

const _deleteFriend = (show) => {
  return {
    type: DELETE_FRIEND,
    show
  };
};

export const fetchFriends = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/friends");
        dispatch(setFriends(data));
  };
};

export const createFriend = (show) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/friends", show);
    dispatch(_createFriend(created));
    // history.push("/friends");
  };
};

export const deleteFriend = (id, history) => {
  return async (dispatch) => {
    const { data: show } = await Axios.delete(`/api/friends/${id}`);
    dispatch(_deleteFriend(show));
    history.push("/friends");
  };
};


const initialState = [];
export default function friendsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FRIENDS:
      return action.shows;
      case CREATE_FRIEND:
        return [...state, action.show];
        case DELETE_FRIEND:
      return state.filter((show) => show.id !== action.show.id)
      ;
      default:
        return state;
    }
  }
