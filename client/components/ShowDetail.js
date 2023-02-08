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
  }, [])
  const ratings =show.ratings
  // const peopleWatching = ratings.filter((ratings.status == "WATCHED"))



  // function peopleWatching(ratings) {
  //   let people = []
  //   if (ratings) {
  //   people = ratings.filter((ratings.status == "WATCHED"))} else {
  //     people = [1]
  //   }
  //      return people;
  //  }

  //  const peeps = peopleWatching(ratings)

   console.log("SHOW", ratings)

  return (
    <div>
    <div>ShowDetail</div>
    <div>{show.name}</div>
        <img style={{width: "18rem"}}  src={show.image}/>
    {ratings? ratings.length ? ratings.map((show) => {
      return(
        <div key={show.id}>
        <div>Rating: {show.rating}</div>
        <div>User Id:{show.userId}</div>
        </div>
      )
    }): <div></div> : <div>No Ratings</div> }
    {ratings ? ratings.length ? <div> People Watched: {ratings.filter((rating) =>rating.status ==="WATCHED").length} </div> : <div></div> : <div></div>}
    {ratings ? ratings.length ? <div> People Watching: {ratings.filter((rating) =>rating.status ==="WATCHING").length} </div> : <div></div> : <div></div>}
    {ratings ? ratings.length ? <div> People Watchlist: {ratings.filter((rating) =>rating.status ==="WATCHLIST").length} </div> : <div></div> : <div></div>}
    {ratings ? ratings.length ?  <div>AverageRating ={(ratings.map(item => item.rating).reduce((prev, next) => prev + next))/(ratings.length)}</div>: <div>No Ratings Yet</div> : <div>No Ratings</div> }
    </div>
  )

}
