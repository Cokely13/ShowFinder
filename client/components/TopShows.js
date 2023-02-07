import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchShows } from '../store/allShowsStore'
import { fetchRatings } from '../store/allRatingsStore'

export default function TopShows() {
  const dispatch = useDispatch()
  const shows = useSelector((state) => state.allShows )
  const {id} = useSelector((state) => state.auth )
  useEffect(() => {
    dispatch(fetchShows())
    // Safe to add dispatch to the dependencies array
  }, [])
  const ratings = useSelector((state) => state.allRatings)
  useEffect(() => {
    dispatch(fetchRatings())
    // Safe to add dispatch to the dependencies array
  }, [])
  const myRatings = ratings.filter((rating) => rating.userId == id)

  // const handleName =(ratings) => {
  //   if (ratings.length) {
  //     return ratings} else
  //       return "HI"
  //     }

  function testNum(ratings) {
    let result
    if (ratings.length) {
      result = ratings;
    } else {
      result = 'NOT positive';
    }
    return result;
  }

  function newSort(ratings) {
   let sortedProducts = [...ratings].sort(
      (p1, p2) => (p1.id < p2.id) ? 1 : (p1.id> p2.id) ? -1 : 0)
      return sortedProducts;
  }

  const check = testNum(shows)
  const newest = newSort(shows)

  console.log("CHECK", check)
  console.log("REVERSE", newest)


  return (
    <div>
    <div>Newest Shows:</div>
    {newest.slice(0,3).map((show) => {
      return(
        <div key={show.id}>
        <Link to={`/shows/${show.id}`}>
        <img style={{width: "18rem"}} src={show.image}/>
        </Link>
        <div>{show.name}</div>
        </div>
      )})}
    </div>
  )
}
