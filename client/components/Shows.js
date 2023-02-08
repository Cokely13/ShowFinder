import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchShows } from '../store/allShowsStore'
import { fetchRatings } from '../store/allRatingsStore'
import ShowStatus from './utilities/ShowStatus'
// import AverageRating from './utilities/AverageRating'

function Shows() {
  const dispatch = useDispatch()
  const [query, setQuery] = useState("")
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
     <div>

    <div>Shows</div>
    <div className="row"><input placeholder="Enter Show Title" onChange={event => setQuery(event.target.value)} />
    { shows.filter(show => {
    if (query === '') {
      return show;
    } else if (show.name.toLowerCase().includes(query.toLowerCase())) {
      return show;
    }
  }).map((show) => {
      return(
        <div key={show.id} className="col">
          <hr></hr>
          <hr></hr>
        <Link to={`/shows/${show.id}`}>
        <img style={{width: "18rem"}}  src={show.image}/>
        </Link>
        <div>{show.name}</div>
        {/* <div>ShowID:{show.id}</div> */}
        {(show.ratings.length)  ? <div>AverageRating: {(show.ratings.map(item => item.rating).reduce((prev, next) => prev + next))/(show.ratings.length)}</div>: <div>No Ratings Yet</div>}
        {/* <AverageRating idShow={show.id}/> */}
        {show.ratings.length ? <div>Number of Ratings: {(show.ratings.length)}</div>: <div></div>}
        <ShowStatus show={show} id={id} allRatings={ratings}  test= {myRatings.filter((rating) =>rating.showId == show.id)}/>
        <p></p>
        </div>
      )
    })}
     </div>
    </div>
    <Link  to={`/show/add`}>ADD SHOW</Link>
    </div>
  )

}

export default Shows
