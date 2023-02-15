import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchSingleUser } from '../../store/singleUserStore'
import { useEffect, useState } from 'react'

export default function UserName(props) {
  const {need} = props
  const dispatch = useDispatch()
  const user= useSelector((state) => state.singleUser )
  useEffect(() => {
    dispatch(fetchSingleUser(need))
    // Safe to add dispatch to the dependencies array
  }, [])

  console.log("IDDDDDD!!", user)
  return (
    <div>Name: {user.username}</div>
  )
}

