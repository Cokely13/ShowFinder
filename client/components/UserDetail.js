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
      <div className="text-center">
      <div className="col"><h1 className="border rounded border-5  border-dark text-white-50 bg-dark text-center" style={{marginBottom: "10px", marginLeft: "auto", marginRight: "auto", width: "25rem"}}>{user.username}'s Profile</h1></div>
    </div>
    <div className="text-center">
    {/* <img className="rounded-circle border border-5  border-dark" style={{width: "18rem"}}  src={user.imageUrl}/> */}
    {(user.username === 'Ac') ? <div className="ac rounded" style={{marginTop: "10px", marginBottom: "10px", width: "8rem", height: "8rem", marginRight: "auto", marginLeft: "auto"}}></div> :
    <div></div> }
    {(user.username === 'Val') ? <div className="val rounded" style={{marginTop: "10px", marginBottom: "10px", width: "8rem", height: "8rem", marginRight: "auto", marginLeft: "auto"}}></div> :
    <div></div> }
    {(user.username === 'Jeff') ? <div className="jeff rounded" style={{marginTop: "10px", marginBottom: "10px", width: "8rem", height: "8rem", marginRight: "auto", marginLeft: "auto"}}></div> :
    <div></div> }
    {(user.username === 'Ryan') ? <div className="ryan rounded" style={{marginTop: "10px", marginBottom: "10px", width: "8rem", height: "8rem", marginRight: "auto", marginLeft: "auto"}}></div> :
    <div></div> }
    </div>
    <h2 className="border rounded border-5  border-dark text-white-50 bg-dark text-center"  style={{marginTop: "15px", width: "15rem", marginLeft: "auto", marginRight: "auto", }}>Favorite Show {user.favShowName}</h2>
    <img className="card border border-5  border-dark" style={{width: "18rem", marginBottom: "10px", marginLeft: "auto", marginRight: "auto"}}  src={user.favShowImage}/>
    </div>
      <h2 className="border rounded border-5  border-dark text-white-50 bg-dark text-center" style={{marginTop: "10px", width: "14rem", marginLeft: "auto", marginRight: "auto"}}>{user.username}'s Shows</h2>
      {!statusView?
      <div>
    <div>
    <div style={{marginLeft: "35px"}}>
      <select onChange={handleChange} name="filterEvents" className='custom-select'>
              <option value="">Filter by Status</option>
              <option value="WATCHED">WATCHED</option>
          <option value="WATCHING">WATCHING</option>
          <option value="WATCHLIST">WATCHLIST</option>
          <option value="">ALL</option>
              </select>
              </div>
              {ratings ? ratings.filter((rating) =>rating.status == "WATCHED").length ? <h2 className="border rounded border-5  border-dark text-white-50 bg-dark text-center" style={{marginTop: "10px", width: "10rem", marginLeft: "auto", marginRight: "auto"}}>Watched</h2>:<div></div> : <div></div>}
      <div className ="row">
      {ratings ? ratings.filter((rating) =>rating.status == "WATCHED").map((show)=> {
        return(
          <div className="col" key={show.id}>
          <div className="container text-center mt-2" >
      <div   className="card border rounded border-5  border-dark text-white-50 bg-dark text-center" style={{width: "18rem", border: "solid black"}}>
      <img className="card-img-top border border-5 rounded  border-dark"  src={show.image} alt="Card image"/>
        <h1><Link to={`/shows/${show.showId}`}>{show.showName}</Link></h1>
        <h4 style={{marginBottom: "10px"}}>Rating: {show.rating}</h4>
        </div></div></div>)}): <div></div>}
        </div>
    </div>
    {ratings ? ratings.filter((rating) =>rating.status == "WATCHING").length ? <h2 className="border rounded border-5  border-dark text-white-50 bg-dark text-center" style={{marginTop: "10px", width: "10rem", marginLeft: "auto", marginRight: "auto"}}>Watching</h2>:<div></div> : <div></div>}
      {/* <h2 className="border rounded border-5  border-dark text-white-50 bg-dark text-center"  style={{marginTop: "15px", width: "15rem",marginLeft: "auto", marginRight: "auto"}}>Watching</h2> */}
      <div className ="row">
      {ratings ? ratings.filter((rating) =>rating.status == "WATCHING").map((show)=> {
        return(
          <div className="col" key={show.id}>
          <div className="container text-center mt-2" >
      <div   className="card border rounded border-5  border-dark text-white-50 bg-dark text-center" style={{width: "18rem", border: "solid black"}}>
      <img className="card-img-top border border-5 rounded  border-dark"  src={show.image} alt="Card image"/>
      <h1><Link to={`/shows/${show.showId}`}>{show.showName}</Link></h1>
      <h4 style={{marginBottom: "10px"}}>Rating: {show.rating}</h4>
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
    </div>
    <div>
    {ratings ? ratings.filter((rating) =>rating.status == "WATCHLIST").length ? <h2 className="border rounded border-5  border-dark text-white-50 bg-dark text-center" style={{marginTop: "10px", width: "10rem", marginLeft: "auto", marginRight: "auto"}}>Watchlist</h2>:<div></div> : <div></div>}
      {/* <h2 className="border rounded border-5  border-dark text-white-50 bg-dark text-center"  style={{marginTop: "15px", width: "15rem",marginLeft: "auto", marginRight: "auto"}}>Watchlist</h2> */}
      <div className ="row">
      {ratings ? ratings.filter((rating) =>rating.status == "WATCHLIST").map((show)=> {
        return(
          <div className="col" key={show.id}>
          <div className="container text-center mt-2" >
      <div   className="card border rounded border-5  border-dark text-white-50 bg-dark text-center" style={{width: "18rem", border: "solid black", marginBottom: "15px"}}>
      <img className="card-img-top border border-5 rounded  border-dark"  src={show.image} alt="Card image"/>
          <h1><Link to={`/shows/${show.showId}`}>{show.showName}</Link></h1>
        </div></div></div>)}): <div></div>}
    </div></div>
    </div>: <div></div>}
    <div>
    {statusView == "WATCHED"?
<div>
<div style={{marginLeft: "35px"}}>
      <select onChange={handleChange} name="filterEvents" className='custom-select'>
              <option value="">Filter by Status</option>
              <option value="WATCHED">WATCHED</option>
          <option value="WATCHING">WATCHING</option>
          <option value="WATCHLIST">WATCHLIST</option>
          <option value="">ALL</option>
              </select>
              </div>

  <h2 className="border rounded border-5  border-dark text-white-50 bg-dark text-center"  style={{marginTop: "15px", width: "15rem",marginLeft: "auto", marginRight: "auto"}}>Watched</h2>
  <div className ="row">
  {ratings ? ratings.filter((rating) =>rating.status ==="WATCHED").map((show)=> {
    return(
      <div className="col" key={show.id}>
      <div className="container text-center mt-2" >
  <div   className="card border rounded border-5  border-dark text-white-50 bg-dark text-center" style={{width: "18rem", border: "solid black", marginBottom: "15px"}}>
  <img className="card-img-top border border-5 rounded  border-dark"  src={show.image} alt="Card image"/>
    <h1><Link to={`/shows/${show.showId}`}>{show.showName}</Link></h1>
    <h4 style={{marginBottom: "10px"}}>Rating: {show.rating}</h4>
      </div></div></div>)}): <div></div>}
    </div></div>: <div></div>}
    {statusView == "WATCHLIST"?
<div>
<div style={{marginLeft: "35px"}}>
      <select onChange={handleChange} name="filterEvents" className='custom-select'>
              <option value="">Filter by Status</option>
              <option value="WATCHED">WATCHED</option>
          <option value="WATCHING">WATCHING</option>
          <option value="WATCHLIST">WATCHLIST</option>
          <option value="">ALL</option>
              </select>
              </div>

  <h2 className="border rounded border-5  border-dark text-white-50 bg-dark text-center"  style={{marginTop: "15px", width: "15rem",marginLeft: "auto", marginRight: "auto"}}>Watchlist</h2>
  <div className ="row">
  {ratings ? ratings.filter((rating) =>rating.status ==="WATCHLIST").map((show)=> {
    return(
      <div className="col" key={show.id}>
      <div className="container text-center mt-2" >
  <div   className="card border rounded border-5  border-dark text-white-50 bg-dark text-center" style={{width: "18rem", border: "solid black", marginBottom: "15px"}}>
  <img className="card-img-top border border-5 rounded  border-dark"  src={show.image} alt="Card image"/>
    <h1><Link to={`/shows/${show.showId}`}>{show.showName}</Link></h1>
      </div></div></div>)}): <div></div>}
    </div></div>: <div></div>}
    {statusView == "WATCHING"?
<div>
<div style={{marginLeft: "35px"}}>
      <select onChange={handleChange} name="filterEvents" className='custom-select'>
              <option value="">Filter by Status</option>
              <option value="WATCHED">WATCHED</option>
          <option value="WATCHING">WATCHING</option>
          <option value="WATCHLIST">WATCHLIST</option>
          <option value="">ALL</option>
              </select>
              </div>

  <h2 className="border rounded border-5  border-dark text-white-50 bg-dark text-center"  style={{marginTop: "15px", width: "15rem",marginLeft: "auto", marginRight: "auto"}}>Watching</h2>
  <div className ="row">
  {ratings ? ratings.filter((rating) =>rating.status ==="WATCHING").map((show)=> {
    return(
      <div className="col" key={show.id}>
      <div className="container text-center mt-2" >
  <div   className="card border rounded border-5  border-dark text-white-50 bg-dark text-center" style={{width: "18rem", border: "solid black", marginBottom: "15px"}}>
  <img className="card-img-top border border-5 rounded  border-dark"  src={show.image} alt="Card image"/>
    <h1><Link to={`/shows/${show.showId}`}>{show.showName}</Link></h1>
    <h4 style={{marginBottom: "10px"}}>Rating: {show.rating}</h4>
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
    </div></div>: <div></div>}
    </div>
    </div>
  )


}
