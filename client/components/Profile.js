import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchUsers } from '../store/allUsersStore'
import { fetchRatings } from '../store/allRatingsStore'

export default function Profile() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.allUsers )
  useEffect(() => {
    dispatch(fetchUsers())
    // Safe to add dispatch to the dependencies array
  }, [])
  const ratings = useSelector((state) => state.allRatings)
  useEffect(() => {
    dispatch(fetchRatings())
    // Safe to add dispatch to the dependencies array
  }, [dispatch])


  console.log("SHOWS", users)
  console.log("RATING", ratings)
  return (
    <div>Profile</div>
  )
}
