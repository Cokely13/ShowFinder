import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchShows } from '../store/allShowsStore'
import { fetchRatings } from '../store/allRatingsStore'
import {fetchSingleUser} from '../store/singleUserStore'
import { updateSingleRating } from '../store/singleRatingStore'
import WatchedShows from './utilities/WatchedShows'
import Watching from './utilities/Watching'
import Watchlist from './utilities/Watchlist'


export default function MyShow() {
  const dispatch = useDispatch()
  // const shows = useSelector((state) => state.allShows )
  const user = useSelector((state) => state.singleUser )
  const {id} = useSelector((state) => state.auth )
  const [editShow, setEditShow] = useState();
  useEffect(() => {
    dispatch(fetchShows())

    // Safe to add dispatch to the dependencies array
  }, [])
  // const ratings = useSelector((state) => state.allRatings)
  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [])
  // const myRatings = ratings.filter((rating) => rating.userId == id)
  // const myshows = shows.filter((show) => show.rating.userId ==id)
  const ratings = user.ratings

  const handleClick2 = (event, show) => {
    event.preventDefault()
    // const newRating = {
    //   showId: props.show.id,
    //   showName: props.show.name,
    //   status: "WATCHING",
    //   userId: props.id
    // }
    // dispatch(createRating(newRating))
    show.rating= event.target.value
    dispatch(updateSingleRating(show))

  }
  // console.log("GIVE ME", ratings)
  // const watched = ratings.filter((rating) =>rating.status == "WATCHED") || []





  return (
    <div>
    <div>
      <div>WATCHED:</div>
      {ratings ? ratings.filter((rating) =>rating.status == "WATCHED").map((show)=> {
        return(
        <div key={show.id}>
        <div>ID:{show.showId}</div>
        <Link to={`/shows/${show.showId}`}>{show.showName}</Link>
        <div>Rating={show.rating}</div>
        <button onClick={() => setEditShow(show.showId)}>Update Rating</button>
        {editShow == show.showId ?
        <div>
        <label>Rating</label>
          <select  onChange={event => handleClick2(event, show)}>
          <option  defaultValue={show.rating}>{show.rating}</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          </select>
          <button onClick={() => setEditShow(0)}>Submit</button>
          </div> : <div></div>}
        </div>)}): <div></div>}
        <hr></hr>
    </div>
    <div>
      <div>WATCHING:</div>
      {ratings ? ratings.filter((rating) =>rating.status == "WATCHING").map((show)=> {
        return(
        <div key={show.id}>
        <Link to={`/shows/${show.showId}`}>{show.showName}</Link>
        <div>ID:{show.showId}</div>
        <div>Rating={show.rating}</div>
        <button onClick={() => setEditShow(show.showId)}>Update Rating</button>
        {editShow == show.showId ?
        <div>
        <label>Rating</label>
          <select   onChange={event => handleClick2(event, show)}>
          <option  defaultValue={show.rating}>{show.rating}</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          </select>
          <button onClick={() => setEditShow(0)}>Submit</button>
          </div> : <div></div>}
        </div>)}): <div></div>}
        <hr></hr>
        <hr></hr>
    </div>
    <div>
      <div>WATCHLIST:</div>
      {ratings ? ratings.filter((rating) =>rating.status == "WATCHLIST").map((show)=> {
        return(
        <div key={show.id}>
          <div>ID:{show.showId}</div>
        <Link to={`/shows/${show.showId}`}>{show.showName}</Link>
        <div>Rating={show.rating}</div>
        </div>)}): <div></div>}
        <hr></hr>
    </div>
    </div>
  )

}
