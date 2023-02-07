import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import {fetchSingleUser} from '../store/singleUserStore'


export default function UserDetail() {
  const dispatch = useDispatch()
  const {id} = useSelector((state) => state.auth )
  const { userId } = useParams();
  const [statusView, setStatusView] = useState();
  useEffect(() => {
    dispatch(fetchSingleUser(userId))

    // Safe to add dispatch to the dependencies array
  }, [])

  const user = useSelector((state) => state.singleUser)
  const ratings = user.ratings

  const handleChange = (event) => {
    event.preventDefault()
    setStatusView(event.target.value)
  }

  return (
    <div>
      <div>{user.username}'s Shows:</div>
      {!statusView?
      <div>
    <div>
    <div>
      <select onChange={handleChange} name="filterEvents" className='custom-select'>
              <option value="">Filter by Status</option>
              <option value="WATCHED">WATCHED</option>
          <option value="WATCHING">WATCHING</option>
          <option value="WATCHLIST">WATCHLIST</option>
          <option value="">ALL</option>
              </select>
              </div>
      <div>WATCHED:</div>
      {ratings ? ratings.filter((rating) =>rating.status == "WATCHED").map((show)=> {
        return(
        <div key={show.id}>
        <div>ID:{show.showId}</div>
        <Link to={`/shows/${show.showId}`}>{show.showName}</Link>
        <div>Rating={show.rating}</div>
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
    </div>: <div></div>}
    <div>
    {statusView == "WATCHED"?
<div>
<div>
      <select onChange={handleChange} name="filterEvents" className='custom-select'>
              <option value="">Filter by Status</option>
              <option value="WATCHED">WATCHED</option>
          <option value="WATCHING">WATCHING</option>
          <option value="WATCHLIST">WATCHLIST</option>
          <option value="">ALL</option>
              </select>
              </div>

  <div>Watched:</div>
  {ratings ? ratings.filter((rating) =>rating.status ==="WATCHED").map((show)=> {
    return(
    <div key={show.id}>
    <div>ID:{show.showId}</div>
    <Link to={`/shows/${show.showId}`}>{show.showName}</Link>
    <div>Rating={show.rating}</div>
      </div>)}): <div></div>}
        <hr></hr>
        <hr></hr>
    </div>: <div></div>}
    {statusView == "WATCHLIST"?
<div>
<div>
      <select onChange={handleChange} name="filterEvents" className='custom-select'>
              <option value="">Filter by Status</option>
              <option value="WATCHED">WATCHED</option>
          <option value="WATCHING">WATCHING</option>
          <option value="WATCHLIST">WATCHLIST</option>
          <option value="">ALL</option>
              </select>
              </div>

  <div>Watchlist:</div>
  {ratings ? ratings.filter((rating) =>rating.status ==="WATCHLIST").map((show)=> {
    return(
    <div key={show.id}>
    <div>ID:{show.showId}</div>
    <Link to={`/shows/${show.showId}`}>{show.showName}</Link>
    <div>Rating={show.rating}</div>
      </div>)}): <div></div>}
        <hr></hr>
        <hr></hr>
    </div>: <div></div>}
    {statusView == "WATCHING"?
<div>
<div>
      <select onChange={handleChange} name="filterEvents" className='custom-select'>
              <option value="">Filter by Status</option>
              <option value="WATCHED">WATCHED</option>
          <option value="WATCHING">WATCHING</option>
          <option value="WATCHLIST">WATCHLIST</option>
          <option value="">ALL</option>
              </select>
              </div>

  <div>Watching:</div>
  {ratings ? ratings.filter((rating) =>rating.status ==="WATCHING").map((show)=> {
    return(
    <div key={show.id}>
    <div>ID:{show.showId}</div>
    <Link to={`/shows/${show.showId}`}>{show.showName}</Link>
    <div>Rating={show.rating}</div>
      </div>)}): <div></div>}
        <hr></hr>
        <hr></hr>
    </div>: <div></div>}
    </div>
    </div>
  )


}
