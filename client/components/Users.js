import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchUsers } from '../store/allUsersStore'
import { createFriend } from '../store/allFriendsStore'

export default function Users() {
  const dispatch = useDispatch()
  const {id} = useSelector((state) => state.auth )
  useEffect(() => {
    dispatch(fetchUsers())

    // Safe to add dispatch to the dependencies array
  }, [])

  const users = useSelector((state) => state.allUsers)

  const addFriend=(event, user) =>{
    event.preventDefault()
    const newFriend ={
      userId: id,
      friendId: user.id,
      friendName: user.username
    }

    dispatch(createFriend(newFriend))

  }

  console.log("HEY", users)

  return (
    <div>
    <h1>Users: </h1>
    {users? users.filter((user) =>user.id !== id).map((user)=> {
      return(
        <div className="col" key={user.id}>
          <div className="container text-center mt-2" >
      <div   className="card border border-dark" style={{width: "18rem", border: "solid black"}}>
      <img className="card-img-top"  src={user.imageUrl} alt="Card image"/>
        <div>UserName: <Link to={`/users/${user.id}`} >{user.username}</Link></div>
        {/* <div>UserId: {user.id}</div> */}
        <button onClick={event => addFriend(event, user)}>Add Friend</button>
        </div></div></div>
      )}) : <div>Hey</div>}
      </div>
  )
}
