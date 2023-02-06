import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
// import { fetchUsers } from '../store/allUsersStore'
import { fetchSingleUser } from '../store/singleUserStore'

export default function UserDetail() {
  const dispatch = useDispatch()
  const {id} = useSelector((state) => state.auth )
  const { userId } = useParams();
  useEffect(() => {
    dispatch(fetchSingleUser(userId))

    // Safe to add dispatch to the dependencies array
  }, [])

  const user = useSelector((state) => state.singleUser)


  return (
    <div>
    <div>User:</div>
    {user ?

        <div key={user.id}>
        <div>UserName:{user.username}</div>
        <div>UserId:{user.id}</div>
        </div>
       : <div>No</div>}
      </div>
  )
}
