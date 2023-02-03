import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'



export default function WatchedShows(props) {

 const {shows} = props

  return (
    <div>
      <h5>WATCHED: </h5>
    <div>
      {shows.map((show) => {
        return(
        <div key={show.id}>
        <Link to={`/shows/${show.showId}}`}>{show.showName}</Link>
        <div>{show.rating}</div>
        </div>
        )})}
    </div>
    </div>
  )
}
