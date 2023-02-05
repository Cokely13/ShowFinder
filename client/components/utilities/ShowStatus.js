import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {updateSingleRating} from '../../store/singleRatingStore'
import { useEffect } from 'react'
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
  const ratings = props.allRatings
  // const totalRatings = ratings.map(item => item.rating).reduce((prev, next) => prev + next)
  const handleClick = (event) => {
    event.preventDefault()
    thisRating.status = "WATCHED"
    dispatch(updateSingleRating(thisRating))
  }
  const handleClick2 = (event) => {
    event.preventDefault()
    thisRating.status = "WATCHING"
    dispatch(updateSingleRating(thisRating))
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
    <div>My Rating: {thisRating.rating}</div>
    <div>Status: {thisRating.status}</div>
    </div>:  <div> <Link to={`/myshows`} > <button onClick={handleSubmit}>Add To Watchlist</button></Link>
    <button onClick={handleSubmit2}>Add To Watching</button> </div>}
    {thisRating ?
    thisRating.status == "WATCHING" ?
    <Link to={`/myshows`} > <button onClick={handleClick}>Add To Watched</button></Link>: <div></div> : <div></div> }
      {thisRating ?
    thisRating.status == "WATCHLIST" ?
        <button onClick={handleClick2}>Add To Watching</button>: <div></div> : <div></div> }
    </div>
  )
}
