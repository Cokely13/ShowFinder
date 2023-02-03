import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'



export default function Watchlist(props) {

 const {shows} = props
//  const WatchedShows = "None" || shows.filter(show => show.status == "WATCHED")
//  const myshows = shows.filter((show) => show.ratings.userId == )
 console.log("SHOWS", shows)
//  console.log("WSHOWS", WatchedShows)
return (
  <div>
    <h5>WATCHLIST: </h5>
  <div>
    {shows.map((show) => {
      return(
      <div key={show.id}>
      <Link to={`/shows/${show.showId}`}>{show.showName}</Link>
      <div>{show.rating}</div>
      </div>
      )})}
  </div>
  </div>
)
}
