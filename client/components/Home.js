import React from 'react'
import {connect} from 'react-redux'
import TopShows from './TopShows'
// import "../index.css"

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props

  return (
    <div>
      <h3 className="text-3xl font-bold underline">Welcome, {username}</h3>
      <TopShows/>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
