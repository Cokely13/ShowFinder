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


  function mostSort(ratings) {

    let sortedProducts = [...ratings].sort(
       (p1, p2) => (p1.ratings.length < p2.ratings.length ) ? 1 : (p1.ratings.length > p2.ratings.length ) ? -1 : 0)
       return sortedProducts;
   }

  const most = mostSort(shows)
  const mostimages = most.map(({ image }) => image)

  return (
    <div>
    <h1 className="col border border-5 rounded  border-dark text-white-50 bg-dark text-center" style={{marginBottom: "10px", marginLeft: "auto", marginRight: "auto", width: "30rem"}}>Most Watched Shows</h1>
    <div id="carouselExampleIndicators" style={{ width: "40rem", marginLeft: "auto", marginRight: "auto", }} className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
<div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100 border border-5 rounded  border-dark"  src={mostimages[0]} alt="First slide"/>
    </div>

    <div className="carousel-item">
    <img className="d-block w-100 border border-5 rounded  border-dark"   src={mostimages[1]} alt="Second slide"/>
    </div>
    <div className="carousel-item">
    <img className="d-block w-100 border border-5 rounded  border-dark"  src={mostimages[2]}alt="Third slide"/>
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
    </div>
  )
}
