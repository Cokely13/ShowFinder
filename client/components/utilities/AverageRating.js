import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchShow } from '../../store/singleShowStore'
import { useParams } from 'react-router-dom'



export default function AverageRating(props) {
  const dispatch = useDispatch()
  const { showId } = useParams();
  useEffect(() => {
    dispatch(fetchShow(props.idShow))
    // Safe to add dispatch to the dependencies array
  }, [dispatch])
  const show = useSelector((state) => state.singleShow )
  const ratings =show.ratings
// console.log("TRYING", ratings)
return (
  <div>
    {/* <h5>TotalRating: </h5> */}
    {ratings ? <div>AverageRating ={(ratings.map(item => item.rating).reduce((prev, next) => prev + next))/(ratings.length)}</div>: <div>Nothing</div>}
    {/* {average ? <div>AverageRating ={(average.map(item => item.rating).reduce((prev, next) => prev + next))/(average.length)}</div>: <div>Nothing</div>} */}
  {/* <div>
    {shows.map((show) => {
      return(
      <div key={show.id}>
      <Link to={`/shows/${show.showId}`}>{show.showName}</Link>
      <div>{show.rating}</div>
      </div>
      )})}
  </div> */}
  </div>
)
}
