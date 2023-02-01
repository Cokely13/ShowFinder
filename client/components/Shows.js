import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchShows } from '../store/allShowsStore'
import { fetchRatings } from '../store/allRatingsStore'

function Shows() {
  const dispatch = useDispatch()
  const shows = useSelector((state) => state.allShows )
  useEffect(() => {
    dispatch(fetchShows())
    // Safe to add dispatch to the dependencies array
  }, [dispatch])
  const ratings = useSelector((state) => state.allRatings)
  useEffect(() => {
    dispatch(fetchRatings())
    // Safe to add dispatch to the dependencies array
  }, [dispatch])


  console.log("SHOWS", shows)
  console.log("RATING", ratings)
  return (
    <div>
    <div>Shows</div>
    {shows.map((show) => {
      return(
        <div key={show.id}>
        <div>{show.name}</div>
        <Link to={`/shows/${show.id}`}>
        <img src={show.image}/>
        </Link>
        {/* {ratings.filter(rating=>rating.showId == show.id).map((rating))} */}
        </div>
      )
    })}
    </div>
  )

}

export default Shows
