import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import showsReducer from './allShowsStore'
import ratingsReducer from './allRatingsStore'
import usersReducer from './allUsersStore'
import singleShowReducer from './singleShowStore'
import singleRatingReducer from './singleRatingStore'
import singleUserReducer from './singleUserStore'
import recommendationsReducer from './allRecommendationsStore'
import friendsReducer from './allFriendsStore'
import singleRecommendationReducer from './singleRecommendationStore'


const reducer = combineReducers({ auth,
allShows: showsReducer,
allRatings: ratingsReducer,
allUsers: usersReducer,
singleShow: singleShowReducer,
singleRating: singleRatingReducer,
singleUser: singleUserReducer,
allRecommendations: recommendationsReducer,
allFriends: friendsReducer,
singleRecommendation: singleRecommendationReducer })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
