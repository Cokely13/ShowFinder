import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchShows } from '../store/allShowsStore'
import { fetchRatings } from '../store/allRatingsStore'
import {fetchSingleUser} from '../store/singleUserStore'
import {fetchUsers} from '../store/allUsersStore'
import { updateSingleRating } from '../store/singleRatingStore'
import { createRecommendation } from '../store/allRecommendationsStore'
import WatchedShows from './utilities/WatchedShows'
import Watching from './utilities/Watching'
import Watchlist from './utilities/Watchlist'


export default function MyShow() {
  const dispatch = useDispatch()

  // const shows = useSelector((state) => state.allShows )
  const user = useSelector((state) => state.singleUser )
  const {id} = useSelector((state) => state.auth )
  const users = useSelector((state) => state.allUsers)
  const [editShow, setEditShow] = useState();
  const [stateReload, setStateReload] = useState(1);
  const [statusView, setStatusView] = useState();
  const [reco, setReco] = useState();
  const [newRec, setNewRec] = useState();
  // useEffect(() => {
  //   dispatch(fetchShows())

  //   // Safe to add dispatch to the dependencies array
  // }, [])
  useEffect(() => {
    dispatch(fetchUsers())

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
    show.rating= event.target.value
    dispatch(updateSingleRating(show))

  }

  const handleClick = (event, show) => {
    event.preventDefault()
    show.status= "WATCHING"
    dispatch(updateSingleRating(show))
    setStateReload(stateReload + 1)

  }

  const handleClick3 = (event, show) => {
    event.preventDefault()
    show.status= "WATCHED"
    dispatch(updateSingleRating(show))
    setStateReload(stateReload + 1)

  }
  // console.log("GIVE ME", ratings)
  // const watched = ratings.filter((rating) =>rating.status == "WATCHED") || []

  const handleChange = (event) => {
    event.preventDefault()
    setStatusView(event.target.value)
  }

  const handleReco= (event, show) => {
    event.preventDefault()
    const recoFriend = users.filter((user)=>user.username == event.target.value)
    const recommend = {
      showId: show.showId,
      showName: show.showName,
      userId: id,
      userName: user.username,
      friendName: event.target.value,
      friendId: recoFriend[0].id
    }
   setNewRec(recommend)
  }

  const submitReco=(event) =>{
    event.preventDefault()
    dispatch(createRecommendation(newRec))
    setReco(0)
  }



  return (
    <div>

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
        <div>Progress:</div>
        {show.progress == 4 ?
        <div className="progress">
        <div className="progress-bar" role="progressbar" style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
        </div> : <div></div>}
        <button onClick={() => setEditShow(show.showId)}>Update Rating</button>
        <button onClick={() => setReco(show.showId)}>Recommend Show</button>
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
          {reco == show.showId ?
        <div>
        <label>Recommend</label>
          <select  onChange={event => handleReco(event, show)}>
          {/* <option  defaultValue={show.rating}>{show.rating}</option> */}
          <option value="">Select Friend</option>
              {users.map((event) => <option key={event.id} value={event.username}>{event.username}</option>)}
          </select>
          <button onClick={event => submitReco(event)}>Submit</button>
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
        <div>Progress: {show.progress}</div>
        {show.progress == 0 ?
        <div className="progress">
        <div className="progress-bar" role="progressbar" style={{width: "0%"}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div> : <div></div>}
        {show.progress == 1 ?
        <div className="progress">
        <div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div> : <div></div>}
        {show.progress == 2 ?
        <div className="progress">
        <div className="progress-bar" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
        </div> : <div></div>}
        {show.progress == 3 ?
        <div className="progress">
        <div className="progress-bar" role="progressbar" style={{width: "75%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
        </div> : <div></div>}
        <button onClick={() => setEditShow(show.showId)}>Update Rating</button>
        <button onClick={event => handleClick3(event, show)}>Add To Watched</button>
        <button onClick={() => setReco(show.showId)}>Recommend Show</button>
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
          {reco == show.showId ?
        <div>
        <label>Recommend</label>
          <select  onChange={event => handleReco(event, show)}>
          {/* <option  defaultValue={show.rating}>{show.rating}</option> */}
          <option value="">Select Friend</option>
              {users.map((event) => <option key={event.id} value={event.username}>{event.username}</option>)}
          </select>
          <button onClick={event => submitReco(event)}>Submit</button>
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
        <div>Progress: {show.progress}</div>
        <button onClick={event => handleClick(event, show)}>Add To Watching</button>
        <button onClick={event => handleClick3(event, show)}>Add To Watched</button>
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
    <div>Progress: {show.progress}</div>
    <button onClick={() => setEditShow(show.showId)}>Update Rating</button>
    <button onClick={() => setReco(show.showId)}>Recommend Show</button>
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
      {reco == show.showId ?
        <div>
        <label>Recommend</label>
          <select  onChange={event => handleReco(event, show)}>
          {/* <option  defaultValue={show.rating}>{show.rating}</option> */}
          <option value="">Select Friend</option>
              {users.map((event) => <option key={event.id} value={event.username}>{event.username}</option>)}
          </select>
          <button onClick={event => submitReco(event)}>Submit</button>
          </div> : <div></div>}
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
    <div>Progress: {show.progress}</div>
    <button onClick={event => handleClick(event, show)}>Add To Watching</button>
        <button onClick={event => handleClick3(event, show)}>Add To Watched</button>
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
    <div>Progress: {show.progress}</div>
    {show.progress == 0 ?
        <div className="progress">
        <div className="progress-bar" role="progressbar" style={{width: "0%"}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div> : <div></div>}
        {show.progress == 1 ?
        <div className="progress">
        <div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div> : <div></div>}
        {show.progress == 2 ?
        <div className="progress">
        <div className="progress-bar" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
        </div> : <div></div>}
        {show.progress == 3 ?
        <div className="progress">
        <div className="progress-bar" role="progressbar" style={{width: "75%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
        </div> : <div></div>}
    <button onClick={() => setEditShow(show.showId)}>Update Rating</button>
    <button onClick={() => setReco(show.showId)}>Recommend Show</button>
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
      {reco == show.showId ?
        <div>
        <label>Recommend</label>
          <select  onChange={event => handleReco(event, show)}>
          {/* <option  defaultValue={show.rating}>{show.rating}</option> */}
          <option value="">Select Friend</option>
              {users.map((event) => <option key={event.id} value={event.username}>{event.username}</option>)}
          </select>
          <button onClick={event => submitReco(event)}>Submit</button>
          </div> : <div></div>}
      <button onClick={event => handleClick3(event, show)}>Add To Watched</button>
      </div>)}): <div></div>}
        <hr></hr>
        <hr></hr>
    </div>: <div></div>}
    </div>
    <Link to="/show/add">Add Show</Link>
    </div>
  )


}
