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
      <div>
    <div>{user.username}'s Profile</div>
    <img className="rounded-circle border border-5  border-dark" style={{width: "18rem"}}  src={user.imageUrl}/>

    <div>Favorite Show: {user.favShowName}</div>
    <img style={{width: "18rem"}}  src={user.favShowImage}/>
    <hr></hr>
    </div>
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
      <div className ="row">
      {ratings ? ratings.filter((rating) =>rating.status == "WATCHED").map((show)=> {
        return(
          <div className="col" key={show.id}>
          <div className="container text-center mt-2" >
      <div   className="card border border-dark" style={{width: "18rem", border: "solid black"}}>
        <h1><Link to={`/shows/${show.showId}`}>{show.showName}</Link></h1>
        <div>Rating={show.rating}</div>
        </div></div></div>)}): <div></div>}
        <hr></hr>
        </div>
    </div>
      <div>WATCHING:</div>
      <div className ="row">
      {ratings ? ratings.filter((rating) =>rating.status == "WATCHING").map((show)=> {
        return(
          <div className="col" key={show.id}>
          <div className="container text-center mt-2" >
      <div   className="card border border-dark" style={{width: "18rem", border: "solid black"}}>
      <h1><Link to={`/shows/${show.showId}`}>{show.showName}</Link></h1>
        <div>Rating={show.rating}</div>
        {show.progress == 0 ?
        <div className="progress" style={{width: "75%", marginLeft: "auto", marginRight: "auto", marginBottom: "10px"}}>
        <div className="progress-bar" role="progressbar" style={{width: "0%"}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div> : <div></div>}
        {show.progress == 1 ?
        <div className="progress" style={{width: "75%", marginLeft: "auto", marginRight: "auto", marginBottom: "10px"}}>
        <div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
        </div> : <div></div>}
        {show.progress == 2 ?
        <div className="progress" style={{width: "75%", marginLeft: "auto", marginRight: "auto", marginBottom: "10px"}}>
        <div className="progress-bar" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">50%</div>
        </div> : <div></div>}
        {show.progress == 3 ?
        <div className="progress" style={{width: "75%", marginLeft: "auto", marginRight: "auto", marginBottom: "10px"}}>
        <div className="progress-bar" role="progressbar" style={{width: "75%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">75%</div>
        </div> : <div></div>}
        </div></div></div>)}): <div></div>}
        <hr></hr>
        <hr></hr>
    </div>
    <div>
      <div>WATCHLIST:</div>
      <div className ="row">
      {ratings ? ratings.filter((rating) =>rating.status == "WATCHLIST").map((show)=> {
        return(
          <div className="col" key={show.id}>
          <div className="container text-center mt-2" >
      <div   className="card border border-dark" style={{width: "18rem", border: "solid black"}}>
          <h1><Link to={`/shows/${show.showId}`}>{show.showName}</Link></h1>
        </div></div></div>)}): <div></div>}
        <hr></hr>
    </div></div>
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
  <div className ="row">
  {ratings ? ratings.filter((rating) =>rating.status ==="WATCHED").map((show)=> {
    return(
      <div className="col" key={show.id}>
      <div className="container text-center mt-2" >
  <div   className="card border border-dark" style={{width: "18rem", border: "solid black"}}>
    <h1><Link to={`/shows/${show.showId}`}>{show.showName}</Link></h1>
    <div>Rating={show.rating}</div>
      </div></div></div>)}): <div></div>}
        <hr></hr>
        <hr></hr>
    </div></div>: <div></div>}
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
  <div className ="row">
  {ratings ? ratings.filter((rating) =>rating.status ==="WATCHLIST").map((show)=> {
    return(
      <div className="col" key={show.id}>
      <div className="container text-center mt-2" >
  <div   className="card border border-dark" style={{width: "18rem", border: "solid black"}}>
    <h1><Link to={`/shows/${show.showId}`}>{show.showName}</Link></h1>
      </div></div></div>)}): <div></div>}
        <hr></hr>
        <hr></hr>
    </div></div>: <div></div>}
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
  <div className ="row">
  {ratings ? ratings.filter((rating) =>rating.status ==="WATCHING").map((show)=> {
    return(
      <div className="col" key={show.id}>
      <div className="container text-center mt-2" >
  <div   className="card border border-dark" style={{width: "18rem", border: "solid black"}}>
    <h1><Link to={`/shows/${show.showId}`}>{show.showName}</Link></h1>
    <div>Rating={show.rating}</div>
    {show.progress == 0 ?
        <div className="progress"style={{width: "75%", marginLeft: "auto", marginRight: "auto", marginBottom: "10px"}}>
        <div className="progress-bar" role="progressbar" style={{width: "0%"}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div> : <div></div>}
        {show.progress == 1 ?
        <div className="progress" style={{width: "75%", marginLeft: "auto", marginRight: "auto", marginBottom: "10px"}}>
        <div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
        </div> : <div></div>}
        {show.progress == 2 ?
        <div className="progress" style={{width: "75%", marginLeft: "auto", marginRight: "auto", marginBottom: "10px"}}>
        <div className="progress-bar" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">50%</div>
        </div> : <div></div>}
        {show.progress == 3 ?
        <div className="progress" style={{width: "75%", marginLeft: "auto", marginRight: "auto", marginBottom: "10px"}}>
        <div className="progress-bar" role="progressbar" style={{width: "75%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">75%</div>
        </div> : <div></div>}
      </div></div></div>)}): <div></div>}
        <hr></hr>
        <hr></hr>
    </div></div>: <div></div>}
    </div>
    </div>
  )


}
