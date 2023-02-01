import React from 'react'
import { useDispatch } from 'react-redux'
import {updateSingleRating} from '../../store/singleRatingStore'

export default function ShowStatus(props) {
  const dispatch = useDispatch()
  console.log("props", props)
  const thisShow = props.test[0]
  const handleClick = (event) => {
    event.preventDefault()
    thisShow.status = "WATCHLIST"
    dispatch(updateSingleRating(thisShow))
    console.log("HEY", thisShow)
  }
  const handleClick2 = (event) => {
    event.preventDefault()
    thisShow.status = "WATCHING"
    dispatch(updateSingleRating(thisShow))
    console.log("HEY@", thisShow)
  }
  // // const showRating = thisShow.rating
  // const ShowRating = thisShow.id || 0
  // console.log("SHOWRATING", ShowRating)
  return (
    <div>
      {thisShow ? <div>
    <div>My Rating: {thisShow.rating}</div>
    <div>Status: {thisShow.status}</div>
    </div>: <div> NOTHING</div>}
    {thisShow ?
    thisShow.status !== "WATCHLIST" ?
     <button onClick={handleClick}>Add To Watchlist</button>: <div></div> : <div></div> }
      {thisShow ?
    thisShow.status !== "WATCHING" ?
        <button onClick={handleClick2}>Add To Watching</button>: <div></div> : <div></div> }
    </div>
  )
}
