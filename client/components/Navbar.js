import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
// import bingeProof from '../Images/bingeProof.png'
// let Logo = require('../images/bingeProof.png')

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    {/* <div classNameName='test'></div> */}
    {/* <img src={Logo}/> */}

    <nav className="navbar navbar-expand-lg navbar-dark  bg-dark"  >
      {isLoggedIn ? (
        <div className="navbar-brand" >
          <ul className="navbar-nav">
          {/* The navbar will show these links after you log in */}
          {/* <Link to="/home">Home</Link> */}
          <li className="nav-item active">
        <a className="nav-link" href="/home">Home</a>
      </li>
          <li className="nav-item">
        <a className="nav-link" href="/shows">Shows</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/myshows">MyShows</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/topshows">TopShows</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/users">Users</a>
      </li>
          <li className="nav-item dropdown" >
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Personal Info
        </a>
        <div className="dropdown-menu bg-dark"  aria-labelledby="navbarDropdownMenuLink">
        <a className="dropdown-item text-white-50" href="/profile">Profile</a>
        <a className="dropdown-item text-white-50" href="/friends">Friends</a>
          <a className="dropdown-item text-white-50" href="/recommendations">Recommendations</a>
          <a className="dropdown-item  text-white-50" href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      </li>
      </ul>
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
