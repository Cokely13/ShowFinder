import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchRecommendations } from '../store/allRecommendationsStore'
import {updateSingleRecommendation} from '../store/singleRecommendationStore'


export default function Recommendations() {
  const dispatch = useDispatch()
  const {id} = useSelector((state) => state.auth )
  useEffect(() => {
    dispatch(fetchRecommendations())

    // Safe to add dispatch to the dependencies array
  }, [])
  const [like, setLike] = useState();
  const [editLike, setEditLike] = useState();
  const recommendations = useSelector((state) => state.allRecommendations)

  const handleChange = (event) => {
    event.preventDefault()
    setLike(event.target.value)
    // console.log("HA", like)
  }

  const handleClick= (event, show) => {
    event.preventDefault()
    show.like = like
    dispatch(updateSingleRecommendation(show))
    setEditLike("")
  }
  console.log("reco", recommendations)

  return (
    <div>
    <div>Recommendations For Me</div>
    {recommendations ? recommendations.filter((reco) =>reco.friendId == id).map((reco)=> {
      return(
        <div key={reco.id}>
        <div>ShowName:<Link to={`/shows/${reco.showId}`} >{reco.showName}</Link></div>
        <div>Recommended By:<Link to={`/users/${reco.userId}`}>{reco.userName}</Link></div>
        <div>Comments:{reco.comments}</div>
        <div>Like:{reco.like}</div>
        <button onClick={() => setEditLike(reco.id)}>Update Like</button>
        {editLike == reco.id?
         <div>
           <select  onChange={event => handleChange(event)}>
           <option value="NONE">Chose Like</option>
           <option value="THUMBS UP">THUMBS UP</option>
           <option value="THUMBS DOWN">THUMBS DOWN</option>
           <option value="NOT GOING TO WATCH">NOT GOING TO WATCH</option>
           </select>
           <button onClick={event => handleClick(event, reco)}>Submit</button>
           </div> : <div></div>}
           </div>
      )}) : <div>No</div>}
      <hr></hr>
       <div>Recommendations By Me</div>
    {recommendations ? recommendations.filter((reco) =>reco.userId == id).map((reco)=> {
      return(
        <div key={reco.id}>
        <div>ShowName:<Link to={`/shows/${reco.showId}`} >{reco.showName}</Link></div>
        <div>Recommended To:<Link to={`/users/${reco.friendId}`}>{reco.friendName}</Link></div>
        <div>Did they like it?:{reco.like}</div>
        </div>
      )}) : <div>No</div>}
      </div>
  )
}
