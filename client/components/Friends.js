import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchSingleUser } from '../store/singleUserStore'
import {fetchFriends} from '../store/allFriendsStore'

export default function Friends() {
  const dispatch = useDispatch()
  const {id} = useSelector((state) => state.auth )
  const user = useSelector((state) => state.singleUser )
  useEffect(() => {
    dispatch(fetchFriends())

    // Safe to add dispatch to the dependencies array
  }, [])
  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [])


  const friends = useSelector((state) => state.allFriends)

  console.log("friends", friends)

  return (
    <div>
      <div>
    <h1 className="border border-5  border-dark text-white-50 bg-dark" style={{width: "10rem"}}>Friends: </h1>
    </div>
    {user.friends? user.friends.map((friend)=> {
      return(
        <div className="col" key={friend.id}>
          <div className="container text-center mt-2" >
      <div   className="card border border-dark" style={{width: "18rem", border: "solid black"}}>
        <div><Link to={`/users/${friend.friendId}`} >{friend.friendName}</Link></div>
        </div></div></div>
      )}) : <div>No</div>}
      </div>
  )
}
