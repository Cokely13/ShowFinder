import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchShows } from '../store/allShowsStore'
import { fetchRatings } from '../store/allRatingsStore'
import ShowStatus from './utilities/ShowStatus'
import AverageRating from './utilities/AverageRating'

function Shows() {
  const dispatch = useDispatch()
  const shows = useSelector((state) => state.allShows )
  const {id} = useSelector((state) => state.auth )
  useEffect(() => {
    dispatch(fetchShows())
    // Safe to add dispatch to the dependencies array
  }, [dispatch])
  const ratings = useSelector((state) => state.allRatings)
  useEffect(() => {
    dispatch(fetchRatings())
    // Safe to add dispatch to the dependencies array
  }, [dispatch])
  const myRatings = ratings.filter((rating) => rating.userId == id)



  console.log("RATING!!!!", ratings)
  console.log("MyRATING", myRatings)

  return (
    <div>
    <div>Shows</div>
    {shows.map((show) => {
      return(
        <div key={show.id}>
        <div>{show.name}</div>
        {/* <AverageRating idShow={show.id}/> */}
        {ratings.length ? <div>totalScore ={(ratings.map(item => item.rating).reduce((prev, next) => prev + next))/(ratings.length)}</div>: <div>Nothing</div>}
        <Link to={`/shows/${show.id}`}>
        <img style={{width: "18rem"}} src={show.image}/>
        </Link>
        <ShowStatus show={show} id={id} allRatings={ratings}  test= {myRatings.filter((rating) =>rating.showId == show.id)}/>
        <p></p>
        </div>
      )
    })}
    </div>
  )

}

export default Shows
