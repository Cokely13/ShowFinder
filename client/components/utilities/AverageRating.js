import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchShow } from '../../store/singleShowStore'
import { useParams } from 'react-router-dom'



export default function AverageRating(props) {
  const dispatch = useDispatch()
  const { showId } = useParams();
  const singleShow = useSelector((state) => state.singleShow )
  useEffect(() => {
    dispatch(fetchShow(props.idShow))
    // Safe to add dispatch to the dependencies array
  }, [dispatch])
  const experiment =singleShow.ratings
console.log("TRYING", singleShow)
return (
  <div>
    {/* <h5>TotalRating: </h5> */}
    {experiment ? <div>AverageRating ={(experiment.map(item => item.rating).reduce((prev, next) => prev + next))/(experiment.length)}</div>: <div>Nothing</div>}
    {experiment ? experiment.map((show) => {
      return(
        <div key={show.id}>
        <div>SHOW RATINGTEST: {show.rating}</div>
        <div>ShowNAME:{show.showName}</div>

   </div>)}): <div>Nothing</div>}
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
