import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchShow } from '../store/singleShowStore'
import { useParams } from 'react-router-dom'
import { updateSingleShow } from '../store/singleShowStore'
import { deleteShow } from '../store/allShowsStore'
import { fetchSingleUser } from '../store/singleUserStore'
// import { fetchRatings } from '../store/allRatingsStore'

export default function ShowDetail() {
  const dispatch = useDispatch()
  const {id} = useSelector((state) => state.auth )
  const { showId } = useParams();
  const [editShow, setEditShow] = useState()
  const [name, setName] = useState();
  const [channel, setChannel] = useState();
  const [createdBy, setCreatedBy] = useState();
  // const [sd, setShowId] = useState();
  const [image, setImage] = useState();
  const show = useSelector((state) => state.singleShow )
  const user = useSelector((state) => state.singleUser )
  useEffect(() => {
    dispatch(fetchSingleUser(id))
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
    console.log("SHOW", newShow)
    dispatch(updateSingleShow(newShow))
    setEditShow("")
  }

  //  console.log("SHOW", user)

  return (
    <div>
    <div>ShowDetail</div>
    {editShow == show.id?
    <div >
    <form>
      <div >
        <div>
        <label>Show Name</label>
          <input name='name' onChange={handleChange}  type="text" placeholder={show.name}/>
        </div>
        <div >
          <label>Channel</label>
          <select  onChange={handleChange2} name="channel" className="form-control">
        <option selected value={show.channel}>{show.channel}</option>
          <option value="HBO">HBO</option>
          <option value="NETFLIX">NETFLIX</option>
          <option value="DISNEY">DISNEY</option>
          <option value="AMAZON">AMAZON</option>
          <option value="OTHER">OTHER</option>
          </select>
        </div>
        <div>
        <label>Image</label>
          <input name='image' onChange={handleChange3}  type="text" placeholder={show.image}/>
        </div>
      </div>
    </form>
    <button onClick={handleClick}>Edit Show</button>
    <button onClick={event => dispatch(deleteShow(show.id))}>Delete Show</button>
  </div>:
    <div>
    <div>{show.name}</div>
        <img style={{width: "18rem"}}  src={show.image}/>
        </div>}
        {editShow == show.id? <div></div>: <div>
    {ratings? ratings.length ? ratings.map((show) => {
      return(
        <div key={show.id}>
        <div>Rating: {show.rating}</div>
        <div>User Id:{show.userId}</div>
        </div>
      )
    }): <div></div> : <div>No Ratings</div> }
    {ratings ? ratings.length ? <div> People Watched: {ratings.filter((rating) =>rating.status ==="WATCHED").length} </div> : <div></div> : <div></div>}
    {ratings ? ratings.length ? <div> People Watching: {ratings.filter((rating) =>rating.status ==="WATCHING").length} </div> : <div></div> : <div></div>}
    {ratings ? ratings.length ? <div> People Watchlist: {ratings.filter((rating) =>rating.status ==="WATCHLIST").length} </div> : <div></div> : <div></div>}
    {ratings ? ratings.length ?  <div>AverageRating ={(ratings.map(item => item.rating).reduce((prev, next) => prev + next))/(ratings.length)}</div>: <div>No Ratings Yet</div> : <div>No Ratings</div> }
    {user.admin?<button onClick={handleUpdate}>Update Show</button>:<div></div> }
    </div>}
    </div>
  )

}
