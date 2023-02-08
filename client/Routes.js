import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import Shows from './components/Shows';
import ShowDetail from './components/ShowDetail'
import Profile from './components/Profile';
import MyShows from './components/MyShows';
import Recommendations from './components/Recommendations';
import Users from './components/Users';
import UserDetail from './components/UserDetail';
import Friends from './components/Friends';
import AddShow from './components/AddShow';
import TopShows from './components/TopShows';
import Progress from './components/utilities/Progress';
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/myshows" component={MyShows}/>
            <Route exact path="/shows" component={Shows}/>
            <Route exact path="/recommendations" component={Recommendations}/>
            <Route exact path="/shows/:showId" component={ShowDetail}/>
            <Route exact path="/show/add" component={AddShow}/>
            <Route path="/profile" component={Profile}/>
            <Route exact path="/users" component={Users}/>
            <Route exact path="/progress" component={Progress}/>
            <Route exact path="/friends" component={Friends}/>
            <Route exact path="/users/:userId" component={UserDetail}/>
            <Route exact path="/topshows" component={TopShows}/>
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ Login } />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
