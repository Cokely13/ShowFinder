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

  function mostSort(ratings) {

    let sortedProducts = [...ratings].sort(
       (p1, p2) => (p1.ratings.length < p2.ratings.length ) ? 1 : (p1.ratings.length > p2.ratings.length ) ? -1 : 0)
       return sortedProducts;
   }

  const most = mostSort(shows)
  const newest = newSort(shows)
  const images = most.map(({ image }) => image)

  console.log("CHECK", most)
  console.log("REVERSE", images[2])


  return (
    <div>
    <h1>Newest Shows:</h1>
    <div id="carouselExampleIndicators" style={{width: "18rem"}} className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
<div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100" src={images[0]} alt="First slide"/>
    </div>

    <div className="carousel-item">
    <img className="d-block w-100" src={images[1]} alt="Second slide"/>
    </div>
    <div className="carousel-item">
    <img className="d-block w-100" src={images[2]}alt="Third slide"/>
    </div>
    </div>
  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>

    {newest.slice(0,3).map((show) => {
      return(
        <div key={show.id}>
        <Link to={`/shows/${show.id}`}>
        <img style={{width: "18rem"}} src={show.image}/>
        </Link>
        <div>{show.name}</div>
        </div>
      )})}
      <div>Most Watched Shows:</div>
    {most.slice(0,3).map((show) => {
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
