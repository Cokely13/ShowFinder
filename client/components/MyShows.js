import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchShows } from '../store/allShowsStore'
import { fetchRatings } from '../store/allRatingsStore'
import {fetchSingleUser} from '../store/singleUserStore'
import WatchedShows from './utilities/WatchedShows'
import Watching from './utilities/Watching'
import Watchlist from './utilities/Watchlist'


export default function MyShow() {
  const dispatch = useDispatch()
  // const shows = useSelector((state) => state.allShows )
  const user = useSelector((state) => state.singleUser )
  const {id} = useSelector((state) => state.auth )
  useEffect(() => {
    dispatch(fetchShows())
    // Safe to add dispatch to the dependencies array
  }, [])
  // const ratings = useSelector((state) => state.allRatings)
  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [])
  // const myRatings = ratings.filter((rating) => rating.userId == id)
  // const myshows = shows.filter((show) => show.rating.userId ==id)
  const ratings = user.ratings






  return (
    <div>
        {ratings? <WatchedShows shows= {ratings.filter((rating) =>rating.status == "WATCHED")}></WatchedShows> :
        <div>NADA</div>}
        {ratings? <Watching shows = {ratings.filter((rating) =>rating.status == "WATCHING")}></Watching> :
        <div>NADA</div>}
        {ratings? <Watchlist shows= {ratings.filter((rating) =>rating.status == "WATCHLIST")}></Watchlist> :
        <div>NADA</div>}
    </div>
  )

}
