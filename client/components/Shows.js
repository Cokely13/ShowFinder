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
     <div className="row">
    <h1 className="col" >All Shows</h1>
    <Link className="col" to={`/show/add`}>ADD SHOW</Link>
    </div>
    <div className="row"><input style={{width: "100%",
  padding: "12px 20px",
  margin: "8px 0", border: "2px solid black", }} placeholder="Search Show Name" onChange={event => setQuery(event.target.value)} />
    { shows.filter(show => {
    if (query === '') {
      return show;
    } else if (show.name.toLowerCase().includes(query.toLowerCase())) {
      return show;
    }
  }).map((show) => {
      return(
        <div className="col" key={show.id}>
        <div className="container text-center mt-2">
        <div  className="card border border-dark" style={{width: "18rem", border: "solid black"}}>
        <Link to={`/shows/${show.id}`}>
        <img className="card-img-top"  src={show.image} alt="Card image"/>
        </Link>
        <h4 className="card-title">{show.name}</h4>
        {/* <div>ShowID:{show.id}</div> */}
        {(show.ratings.length)  ? <div className="mt-1">Average Rating: {Math.floor((show.ratings.map(item => item.rating).reduce((prev, next) => prev + next))/(show.ratings.length))}</div>: <div>No Ratings Yet</div>}
        {/* <AverageRating idShow={show.id}/> */}
        {show.ratings.length ? <div className="mt-1">Number of Ratings: {(show.ratings.length)}</div>: <div></div>}
        <ShowStatus show={show} id={id} allRatings={ratings}  test= {myRatings.filter((rating) =>rating.showId == show.id)}/>
        <p></p>
        </div>
        </div>
        </div>
      )
    })}
     </div>
    </div>
    </div>
  )

}

export default Shows
