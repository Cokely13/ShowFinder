import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {createShow} from '../store/allShowsStore'
// // import { fetchUsers } from '../store/allUsersStore'
// import { fetchSingleUser } from '../store/singleUserStore'

export default function AddShow() {
  const dispatch = useDispatch()
  const [name, setName] = useState();
  const [createdBy, setCreatedBy] = useState();
  const [channel, setChannel] = useState();
  const {id} = useSelector((state) => state.auth )
  // const { userId } = useParams();
  // useEffect(() => {
  //   dispatch(fetchSingleUser(userId))

  //   // Safe to add dispatch to the dependencies array
  // }, [])

  // const user = useSelector((state) => state.singleUser)

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

  const handleClick = (e) => {
    e.preventDefault()
    const newShow = {
      name: name,
      channel: channel,
      createdBy: createdBy
    }

    dispatch(createShow(newShow))
  }


  return (
    <div >
    <form>
      <div >
        <div>
        <label>Show Name</label>
          <input name='name' onChange={handleChange}  type="text" placeholder='Name'/>
        </div>
        <div >
          <label>Channel</label>
          <select  onChange={handleChange2} name="channel" className="form-control">
        <option disabled selected value="Channel">Select Channel</option>
          <option value="HBO">HBO</option>
          <option value="NETFLIX">NETFLIX</option>
          <option value="DISNEY">DISNEY</option>
          <option value="AMAZON">AMAZON</option>
          <option value="OTHER">OTHER</option>
          </select>
        </div>
      </div>
    </form>
    <button onClick={handleClick}>Add Show</button>
  </div>
  )
}
