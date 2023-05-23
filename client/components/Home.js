import React from 'react'
import {connect} from 'react-redux'
import TopShows from './TopShows'
import NewestShows from './NewestShows'


/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props

  return (
    <div className="p-3 mb-2 bg-white text-dark" >
      <div className="val rounded" style={{marginTop: "10px", marginBottom: "10px", width: "50%", height: "15rem", marginRight: "auto", marginLeft: "auto"}}></div>
      <NewestShows/>
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
