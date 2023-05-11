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

  return (
    <div>
      <div className="text-center">
    <div className="col"><h1 className="border rounded border-5  border-dark text-white-50 bg-dark" style={{marginBottom: "20px", marginLeft: "auto", marginRight: "auto", width: "25rem"}}>Recommendations</h1></div>
    </div>

    <h2 className="border rounded border-5  border-dark text-white-50 bg-dark" style={{marginTop: "10px", marginLeft: "auto", marginRight: "auto", width: "7rem"}}>For Me</h2>
    <div className ="row">
    {recommendations ? recommendations.filter((reco) =>reco.friendId == id).map((reco)=> {
      return(
        <div className="col" key={reco.id}>
          <div className="container text-center mt-2" >
      <div   className="card border  border-dark text-white-50 bg-dark" style={{width: "18rem", border: "solid black"}}>
      <img className="card-img-top border border-5 rounded  border-dark"  src={reco.showImage} alt="Card image"/>
        <h3><Link to={`/shows/${reco.showId}`} >{reco.showName}</Link></h3>
        <h5>Recommended By: <Link to={`/users/${reco.userId}`}>{reco.userName}</Link></h5>
        <h5>Comments: {reco.comments}</h5>
        <h5>Like: {reco.like}</h5>
        {reco.like == "THUMBS UP" ?
        <span id="boot-icon" className="bi bi-hand-thumbs-up" style={{fontSize: "5rem"}}></span> : <div></div>}
        {reco.like == "THUMBS DOWN" ?
        <span id="boot-icon" className="bi bi-hand-thumbs-down" style={{fontSize: "5rem"}}></span> : <div></div>}
        {reco.like == "NOT GOING TO WATCH" ?
        <span id="boot-icon" className="bi bi-trash" style={{fontSize: "5rem"}}></span> : <div></div>}
        <div style={{marginBottom: "5px", marginTop: "5px"}}><button className="btn btn-primary" style={{width: "50%"}}  onClick={() => setEditLike(reco.id)}>Respond</button></div>
        {editLike == reco.id?
         <div>
           <select style={{width: "50%"}} onChange={event => handleChange(event)}>
           <option value="NONE">Response</option>
           <option value="THUMBS UP">THUMBS UP</option>
           <option value="THUMBS DOWN">THUMBS DOWN</option>
           <option value="NOT GOING TO WATCH">NOT GOING TO WATCH</option>
           </select>
           <button className="btn btn-primary" style={{ marginLeft:"10px", marginRight:"10px", marginBottom: "10px"}} onClick={event => handleClick(event, reco)}>Submit</button>
           </div> : <div></div>}
           </div> </div> </div>
      )}) : <div>No</div>}
      </div>
       <h2 className="border rounded border-5  border-dark text-white-50 bg-dark" style={{marginTop: "10px", marginLeft: "auto", marginRight: "auto", width: "100px"}}>By Me</h2>
       <div className ="row">
    {recommendations ? recommendations.filter((reco) =>reco.userId == id).map((reco)=> {
      return(
        <div className="col" key={reco.id}>
        <div className="container text-center mt-2" >
    <div   className="card border border-dark text-white-50 bg-dark" style={{width: "18rem", border: "solid black"}}>
    <img className="card-img-top border border-5 rounded  border-dark"  src={reco.showImage} alt="Card image"/>
        <h3><Link to={`/shows/${reco.showId}`} > {reco.showName}</Link></h3>
        <h5>Recommended To: <Link to={`/users/${reco.friendId}`}> {reco.friendName}</Link></h5>
        <h5>Response: {reco.like}</h5>
        {reco.like == "THUMBS UP" ?
        <span id="boot-icon" className="bi bi-hand-thumbs-up" style={{fontSize: "5rem"}}></span> : <div></div>}
        {reco.like == "THUMBS DOWN" ?
        <span id="boot-icon" className="bi bi-hand-thumbs-down" style={{fontSize: "5rem"}}></span> : <div></div>}
        {reco.like == "NOT GOING TO WATCH" ?
        <span id="boot-icon" className="bi bi-trash" style={{fontSize: "5rem"}}></span> : <div></div>}
        </div></div></div>
      )}) : <div>No</div>}
      </div>
      </div>
  )
}
