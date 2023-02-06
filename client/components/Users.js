import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchUsers } from '../store/allUsersStore'

export default function Users() {
  const dispatch = useDispatch()
  const {id} = useSelector((state) => state.auth )
  useEffect(() => {
    dispatch(fetchUsers())

    // Safe to add dispatch to the dependencies array
  }, [])

  const users = useSelector((state) => state.allUsers)


  return (
    <div>
    <div>Users</div>
    {users ? users.map((reco)=> {
      return(
        <div key={reco.id}>
        <div>UserName:<Link to={`/users/${reco.id}`} >{reco.username}</Link></div>
        <div>UserId:{reco.id}</div>
        </div>
      )}) : <div>No</div>}
      </div>
  )
}
