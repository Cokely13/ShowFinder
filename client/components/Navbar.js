import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
// import bingeProof from '../Images/bingeProof.png'
// let Logo = require('../images/bingeProof.png')

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    {/* <div className='test'></div> */}
    {/* <img src={Logo}/> */}

    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/shows">Shows</Link>
          <Link to="/myshows">MyShows</Link>
          <Link to="/topshows">TopShows</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/recommendations">Recommendations</Link>
          <Link to="/users">Users</Link>
          <Link to="/friends">Friends</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
