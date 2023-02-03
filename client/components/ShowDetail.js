import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchShow } from '../store/singleShowStore'
import { useParams } from 'react-router-dom'
// import { fetchRatings } from '../store/allRatingsStore'

export default function ShowDetail() {
  const dispatch = useDispatch()
  const { showId } = useParams();
  const show = useSelector((state) => state.singleShow )
  useEffect(() => {
    dispatch(fetchShow(showId))
    // Safe to add dispatch to the dependencies array
  }, [dispatch])
  const ratings =show.ratings
  // const ratings = useSelector((state) => state.allRatings)
  // useEffect(() => {
  //   dispatch(fetchRatings())
  //   // Safe to add dispatch to the dependencies array
  // }, [dispatch])


  // console.log("SHOWS", ratings)
  // console.log("RATING", ratings)
  return (
    <div>
    <div>ShowDetail</div>
    <div>{show.name}</div>
        <img style={{width: "18rem"}}  src={show.image}/>
    {ratings? ratings.map((show) => {
      return(
        <div key={show.id}>
        <div>Rating: {show.rating}</div>
        <div>User Id:{show.userId}</div>
        </div>
      )
    }): <div>No Ratings</div>}
    {ratings ? <div>AverageRating ={(ratings.map(item => item.rating).reduce((prev, next) => prev + next))/(ratings.length)}</div>: <div>Nothing</div>}
    </div>
  )

}
