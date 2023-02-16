import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchUsers } from '../store/allUsersStore'
import { createFriend } from '../store/allFriendsStore'
import { fetchFriends } from '../store/allFriendsStore'

export default function Users() {
  const dispatch = useDispatch()
  const {id} = useSelector((state) => state.auth )
  const friends = useSelector((state) => state.allFriends)
  useEffect(() => {
    dispatch(fetchUsers())

    // Safe to add dispatch to the dependencies array
  }, [])
  useEffect(() => {
    dispatch(fetchFriends())

    // Safe to add dispatch to the dependencies array
  }, [])

  const users = useSelector((state) => state.allUsers)

  console.log("Friends", friends)

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
      <img className="card-img-top rounded-circle border border-5  border-dark"  style={{width: "75%", marginLeft: "auto", marginRight: "auto", marginTop: "10px", marginBottom: "10px"}} src={user.imageUrl} alt="Card image"/>
        <div>UserName: <Link to={`/users/${user.id}`} >{user.username}</Link></div>
        {/* <div>UserId: {user.id}</div> */}
        {/* allUsers.filter((user) =>user.id == show.userId */}
        {friends.filter((friend) => friend.friendId == user.id).length ? <div>FRIEND!!!</div>: <div className="text-center">
        <button className="btn btn-primary justify-content-center" style={{width: "75%", content: "center", marginTop: "10px", marginBottom: "10px"}} onClick={event => addFriend(event, user)}>Add Friend</button>
        </div>}
        </div></div></div>
      )}) : <div>Hey</div>}
      </div>
  )
}
