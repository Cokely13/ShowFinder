import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchShow } from '../store/singleShowStore'
import { useParams } from 'react-router-dom'
import { updateSingleShow } from '../store/singleShowStore'
import { deleteShow } from '../store/allShowsStore'
import { fetchSingleUser } from '../store/singleUserStore'
import StarRating from './utilities/StarRating'
import usersReducer, {fetchUsers} from '../store/allUsersStore'
import UserName from './utilities/UserName'
// import { fetchRatings } from '../store/allRatingsStore'

export default function ShowDetail() {
  const dispatch = useDispatch()
  const {id} = useSelector((state) => state.auth )
  const { showId } = useParams();
  const [editShow, setEditShow] = useState()
  const [name, setName] = useState();
  const [statusView, setStatusView] = useState();
  const [channel, setChannel] = useState();
  const [createdBy, setCreatedBy] = useState();
  // const [sd, setShowId] = useState();
  const [image, setImage] = useState();
  const show = useSelector((state) => state.singleShow )
  const user = useSelector((state) => state.singleUser )
  const allUsers = useSelector((state) => state.allUsers )
  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [])
  useEffect(() => {
    dispatch(fetchUsers())
    // Safe to add dispatch to the dependencies array
  }, [])

  useEffect(() => {
    dispatch(fetchShow(showId))
    // Safe to add dispatch to the dependencies array
  }, [])
  const ratings =show.ratings
  // const peopleWatching = ratings.filter((ratings.status == "WATCHED"))

  // function peopleWatching(ratings) {
  //   let people = []
  //   if (ratings) {
  //   people = ratings.filter((ratings.status == "WATCHED"))} else {
  //     people = [1]
  //   }
  //      return people;
  //  }

  //  const peeps = peopleWatching(ratings)

  const handleChange = (event) => {
    event.preventDefault()
    setName(event.target.value)
    setCreatedBy(id)
    // console.log("HA", like)
  }

  const handleChange2 = (event) => {
    event.preventDefault()
    setChannel(event.target.value)
    // console.log("HA", like)
  }

  const handleChange3 = (event) => {
    event.preventDefault()
    setImage(event.target.value)
    // console.log("HA", like)
  }

  const handleUpdate =(event) => {
    event.preventDefault()
    setName(show.name)
    setChannel(show.channel)
    setImage(show.image)
    setEditShow(show.id)
  }

  const handleClick = (e) => {
    e.preventDefault()
    const newShow = {
      id: showId,
      name: name,
      channel: channel,
      createdBy: show.createdBy,
      image: image
    }
    dispatch(updateSingleShow(newShow))
    setEditShow("")
  }

  const handleUpdate2 =(event) => {
    event.preventDefault()
    setStatusView("Rating")
  }




  return (
    <div>
    {/* <h1>ShowDetail:</h1> */}
    {editShow == show.id?
    <div >
    <form>
      <div className ="row text-center">
        <div>
        <label> <h2 htmlFor="username" style={{marginRight: "10px"}}>Show Name: </h2></label>
          <input name='name' onChange={handleChange}  type="text" placeholder={show.name}/>
        </div>
        <div>
          <label><h2 htmlFor="username" style={{marginRight: "10px"}}>Channel:  </h2></label>
          <select  onChange={handleChange2} name="channel" >
        <option selected value={show.channel}>{show.channel}</option>
          <option value="HBO">HBO</option>
          <option value="NETFLIX">NETFLIX</option>
          <option value="DISNEY">DISNEY</option>
          <option value="AMAZON">AMAZON</option>
          <option value="OTHER">OTHER</option>
          </select>
          </div>
        <div>
        <label><h2 htmlFor="username" style={{marginRight: "10px"}}>Image: </h2></label>
          <input name='image' onChange={handleChange3}  type="text" placeholder={show.image}/>
        </div>
      </div>
    </form>
    <div className='text-center'>
    <button className="btn btn-primary" style={{width: "15%", marginBottom: "10px", marginRight: "30px"}}  onClick={handleClick}>Update Show</button>
    <button className="btn btn-danger" style={{width: "15%", marginBottom: "10px", marginRight: "30px"}} onClick={event => dispatch(deleteShow(show.id))}>Delete Show</button>
    </div>
  </div>:
    <div className='text-center'>
    <h1>{show.name}</h1>
        <img className='border rounded border-5  border-dark' style={{width: "18rem"}}  src={show.image}/>
        </div>}
        <div className="container text-center mt-2" style={{marginTop: "15px"}}  >
    <div  className="text-center justify-content-center" >
    {ratings ? ratings.length ? <h3> Watched: {ratings.filter((rating) =>rating.status ==="WATCHED").length} </h3> : <div></div> : <div></div>}
    {ratings ? ratings.length ? <h3> Watching: {ratings.filter((rating) =>rating.status ==="WATCHING").length} </h3> : <div></div> : <div></div>}
    {ratings ? ratings.length ? <h3> Watchlist: {ratings.filter((rating) =>rating.status ==="WATCHLIST").length} </h3> : <div></div> : <div></div>}
    {ratings ? ratings.length ?  <h3>Average Rating: {Math.floor((ratings.map(item => item.rating).reduce((prev, next) => prev + next))/(ratings.length))}</h3>: <h2>No Ratings Yet</h2> : <div>No Ratings</div> }
    {ratings ? ratings.length ?<div style={{ width: "35%",marginLeft: "auto", marginRight: "auto", marginBottom: "15px"}} ><StarRating rating ={Math.floor((ratings.map(item => item.rating).reduce((prev, next) => prev + next))/(ratings.length))} size ={40} /></div>: <div></div> : <h2>No Ratings</h2> }
    </div>
    </div>
        {editShow == show.id? <div></div>: <div>
        <div >
              {statusView == "Rating"?  <div>
        {ratings ? ratings.length ? <h1 className="border rounded border-5  border-dark text-white-50 bg-dark text-center" style={{width: "10rem", marginLeft: "auto", marginRight: "auto"}} >Ratings</h1> : <div></div> : <h2>No Ratings</h2> }
        <div className="row" key={show.id} style={{marginLeft: "15px", marginRight: "15px"}}>
    {ratings.length? show.id? ratings.map((show) => {
      return(
        <div className="col" key={show.id} >
        <div className="container text-center mt-2">
        <div className="card border rounded border-5  border-dark text-white-50 bg-dark"  style={{width: "18rem", height: "18rem"}}>
       <img className="rounded-circle border border-5  border-dark" style={{width: "75%", height: "18rem", marginLeft: "auto", marginRight: "auto", marginTop: "10px", marginBottom: "10px"}} src={allUsers.filter((user) =>user.id == show.userId)[0].imageUrl}/>
        <Link to={`/users/${show.userId}`}>{allUsers.filter((user) =>user.id == show.userId)[0].username}</Link>
        <div>Rating: {show.rating}</div>
        {/* <div>User Id:{show.userId}</div> */}
        {/* ratings.filter((rating) =>rating.status == "WATCHED") */}
        </div>
        </div>
        </div>

      )
    }): <div></div> : <h2></h2> }
     </div>
    </div> :  <div style={{width: "10rem", marginLeft: "auto", marginRight: "auto", marginBottom: "20px", marginTop: "20px"}} >
        <button className='btn btn-danger'  onClick={handleUpdate2}>VIEW RATINGS</button>
              </div>} </div>
    {user.admin?<div style={{width: "10rem", marginLeft: "auto", marginRight: "auto", marginBottom: "20px", marginTop: "20px"}}><button style={{width: "10rem", marginLeft: "auto", marginRight: "auto", marginBottom: "20px", marginTop: "20px"}} className='btn btn-secondary'  onClick={handleUpdate}>UPDATE SHOW</button></div>:<div></div> }
    </div>}
    </div>
  )

}
