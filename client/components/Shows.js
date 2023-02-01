import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchShows } from '../store/allShows'
import { fetchUserShows } from '../store/allUserShows'

function Shows() {
  const dispatch = useDispatch()
  const shows = useSelector((state) => state.allShows )
  useEffect(() => {
    dispatch(fetchShows())
    // Safe to add dispatch to the dependencies array
  }, [dispatch])
  const userShows = useSelector((state) => state.allUserShows)
  useEffect(() => {
    dispatch(fetchUserShows())
    // Safe to add dispatch to the dependencies array
  }, [dispatch])


  console.log("SHOWS", shows)
  console.log("SHOWS", userShows)
  return (
    <div>Shows</div>
  )
}

export default Shows
