import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchShows } from '../store/allShowsStore'
import { fetchRatings } from '../store/allRatingsStore'
import ShowStatus from './utilities/ShowStatus'
// import AverageRating from './utilities/AverageRating'

function Shows() {
  const dispatch = useDispatch()
  const shows = useSelector((state) => state.allShows )
  const {id} = useSelector((state) => state.auth )
  useEffect(() => {
    dispatch(fetchShows())
    // Safe to add dispatch to the dependencies array
  }, [])
  const ratings = useSelector((state) => state.allRatings)
  useEffect(() => {
    dispatch(fetchRatings())
    // Safe to add dispatch to the dependencies array
  }, [])
  const myRatings = ratings.filter((rating) => rating.userId == id)


  return (
    <div>
    <div>Shows</div>
    {shows.map((show) => {
      return(
        <div key={show.id}>
        <Link to={`/shows/${show.id}`}>
        <img style={{width: "18rem"}} src={show.image}/>
        </Link>
        <div>{show.name}</div>
        <div>ShowID:{show.id}</div>
        {(show.ratings.length)  ? <div>AverageRating ={(show.ratings.map(item => item.rating).reduce((prev, next) => prev + next))/(show.ratings.length)}</div>: <div>No Ratings Yet</div>}
        {/* <AverageRating idShow={show.id}/> */}
        {show.ratings.length ? <div>Number of Ratings ={(show.ratings.length)}</div>: <div>Nothing</div>}
        <ShowStatus show={show} id={id} allRatings={ratings}  test= {myRatings.filter((rating) =>rating.showId == show.id)}/>
        <p></p>
        </div>
      )
    })}
    <Link  to={`/show/add`}>ADD SHOW</Link>
    </div>
  )

}

export default Shows
