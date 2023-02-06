import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchRecommendations } from '../store/allRecommendationsStore'

export default function Recommendations() {
  const dispatch = useDispatch()
  const {id} = useSelector((state) => state.auth )
  useEffect(() => {
    dispatch(fetchRecommendations())

    // Safe to add dispatch to the dependencies array
  }, [])

  const recommendations = useSelector((state) => state.allRecommendations)


  return (
    <div>
    <div>Recommendations For Me</div>
    {recommendations ? recommendations.filter((reco) =>reco.friendId == id).map((reco)=> {
      return(
        <div key={reco.id}>
        <div>ShowName:<Link to={`/shows/${reco.showId}`} >{reco.showName}</Link></div>
        <div>Recommended By:<Link to={`/users/${reco.userId}`}>{reco.userName}</Link></div>
        </div>
      )}) : <div>No</div>}
      <hr></hr>
       <div>Recommendations By Me</div>
    {recommendations ? recommendations.filter((reco) =>reco.userId == id).map((reco)=> {
      return(
        <div key={reco.id}>
        <div>ShowName:<Link to={`/shows/${reco.showId}`} >{reco.showName}</Link></div>
        <div>Recommended To:<Link to={`/users/${reco.friendId}`}>{reco.friendName}</Link></div>
        </div>
      )}) : <div>No</div>}
      </div>
  )
}
