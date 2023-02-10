import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {updateSingleRating} from '../../store/singleRatingStore'
import { useEffect, useState } from 'react'
import { fetchShow } from '../../store/singleShowStore'
import { createRating } from '../../store/allRatingsStore'
import { Link } from 'react-router-dom'
import AverageRating from './AverageRating'


export default function ShowStatus(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchShow(props.show.id))
  }, [])
  const showInfo = useSelector((state) => state.singleShow)
  const thisRating = props.test[0]
  const [stateReload, setStateReload] = useState(1);
  const ratings = props.allRatings
  // const totalRatings = ratings.map(item => item.rating).reduce((prev, next) => prev + next)
  const handleClick = (event) => {
    event.preventDefault()
    thisRating.status = "WATCHED"
    dispatch(updateSingleRating(thisRating))
    setStateReload(stateReload + 1)
  }
  const handleClick2 = (event) => {
    event.preventDefault()
    thisRating.status = "WATCHING"
    dispatch(updateSingleRating(thisRating))
    setStateReload(stateReload + 1)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newRating = {
      showId: props.show.id,
      showName: props.show.name,
      status: "WATCHLIST",
      userId: props.id
    }
    dispatch(createRating(newRating))

  }
  const handleSubmit2 = (event) => {
    event.preventDefault()
    const newRating = {
      showId: props.show.id,
      showName: props.show.name,
      status: "WATCHING",
      userId: props.id
    }
    dispatch(createRating(newRating))
  }
  return (
    <div>

      {thisRating ? <div>
    <div className="mt-1">My Rating: {thisRating.rating}</div>
    <div className="mt-1">Status: {thisRating.status}</div>
    </div>:  <div> <Link to={`/myshows`} > <button className="btn btn-primary mt-2" onClick={handleSubmit}>Add To Watchlist</button></Link>
    <button className="btn btn-primary mt-2" onClick={handleSubmit2}>Add To Watching</button> </div>}
    {thisRating ?
    thisRating.status == "WATCHING" ?
     <button className="btn btn-primary mt-4" onClick={handleClick}>Add To Watched</button>: <div></div> : <div></div> }
      {thisRating ?
    thisRating.status == "WATCHLIST" ?
        <button className="btn btn-primary mt-2" onClick={handleClick2}>Add To Watching</button>: <div></div> : <div></div> }
    </div>
  )
}
