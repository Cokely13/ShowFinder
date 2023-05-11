import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchShows } from '../store/allShowsStore'
import { fetchRatings } from '../store/allRatingsStore'
import ShowStatus from './utilities/ShowStatus'
import ReactStars from 'react-rating-stars-component'
import StarRating from './utilities/StarRating'
// import AverageRating from './utilities/AverageRating'

function Shows() {
  const dispatch = useDispatch()
  const [query, setQuery] = useState("")
  const shows = useSelector((state) => state.allShows )
  const [statusView, setStatusView] = useState();
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleUpdate =(event) => {
    event.preventDefault()
    setStatusView("LIST")
  }

  const handleUpdate2 =(event) => {
    event.preventDefault()
    setStatusView("")
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const myRatings = ratings.filter((rating) => rating.userId == id)

  const sortedShows = shows.sort((a, b) => {
    if (sortBy === 'name a-z') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'name z-a') {
      return b.name.localeCompare(a.name);
    }
   else if (sortBy === '') {
    return shows;
  }else {
      return 0;
    }
  });

  const pageCount = Math.ceil(sortedShows.length / pageSize);
  const pageRange = [...Array(pageCount).keys()].map(i => i + 1);

  const paginatedShows = sortedShows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
     <div>
     <div className="row">
     <div className="text-center">
    <div className="col"><h1 className="border border-5 rounded  border-dark text-white-50 bg-dark text-center" style={{marginBottom: "10px", marginLeft: "auto", marginRight: "auto", width: "15rem"}}>All Shows</h1></div>
    </div>
    </div>
    {statusView == "LIST"?
    <div style={{marginLeft: "35px"}}>
              <button className='btn btn-danger'  onClick={handleUpdate2}>VIEW AS CARDS</button>
              <div className='search-sort' style={{marginTop: "20px"}}>

<select value={sortBy} onChange={handleSortChange}>
  <option value="">Sort by...</option>
  <option value="name a-z">Name A-Z</option>
  <option value="name z-a">Name Z-A</option>
</select>
</div>
              </div> :
               <div style={{marginLeft: "35px"}} >
                       <button className='btn btn-danger'  onClick={handleUpdate}>VIEW AS LIST</button>
                       <div className='search-sort' style={{marginTop: "20px"}}>

<select value={sortBy} onChange={handleSortChange}>
  <option value="">Sort by...</option>
  <option value="name a-z">Name A-Z</option>
  <option value="name z-a">Name Z-A</option>
</select>
</div>
                       </div>}

              {statusView == "LIST"? <div>
              <div className="row">
      <div style={{width: "20rem", marginLeft: "auto", marginRight: "auto",marginBottom: "10px"}}>
    <input style={{width: "100%",
  padding: "12px 20px",
  marginLeft: "10px", border: "4px solid grey", }} placeholder="Search Show Name" onChange={event => setQuery(event.target.value)} />
  </div>
  </div>
  {query ?

shows.filter(show => {
if (query === '') {
 return show;
} else if (show.name.toLowerCase().includes(query.toLowerCase())) {
 return show;
}
}).map((show) => {
  return(
    <h3 key={show.id} style={{marginTop: "10px", marginBottom:'10px', marginLeft: "25%",}}><Link to={`/shows/${show.id}`}>{show.name}</Link></h3>
  )
}) :
              paginatedShows.map((show) => {
                  return(
                    <h3 key={show.id} style={{marginTop: "10px", marginBottom:'10px', marginLeft: "25%",}}><Link to={`/shows/${show.id}`}>{show.name}</Link></h3>
                  )
                })}
                 </div> :
    <div className="row">
      <div>
      <div style={{width: "20rem", marginLeft: "auto", marginRight: "auto",marginBottom: "10px"}}>
    <input style={{width: "100%",
  padding: "12px 20px",
  marginLeft: "10px", border: "4px solid grey", }} placeholder="Search Show Name" onChange={event => setQuery(event.target.value)} />
  </div>
  </div>
    {query ?

     shows.filter(show => {
    if (query === '') {
      return show;
    } else if (show.name.toLowerCase().includes(query.toLowerCase())) {
      return show;
    }
  }).map((show) => {
      return(
        <div className="col" key={show.id}>
        <div className="container text-center mt-2">
        <div  className="card border border-5  border-dark text-white-50 bg-dark" style={{width: "18rem", border: "solid black"}}>
        <Link to={`/shows/${show.id}`}>
        {/* card-img-top border border-5  border-dark style={{maxWidth:"100%", height: "auto"}} */}
        <img className="card-img-top border border-5 rounded  border-dark"  src={show.image} alt="Card image"/>
        </Link>
        <h4 className="card-title">{show.name}</h4>
        <h4>{show.status}</h4>
        {/* <div>ShowID:{show.id}</div> */}
        {(show.ratings.length)  ? <div className="mt-1">Average Rating: {Math.floor((show.ratings.map(item => item.rating).reduce((prev, next) => prev + next))/(show.ratings.length))}</div>: <div>No Ratings Yet</div>}
        {/* <AverageRating idShow={show.id}/> */}
        {show.ratings.length ? <div className="mt-1">Number of Ratings: {(show.ratings.length)}</div>: <div></div>}
         {(show.ratings.length)  ?<div style={{marginLeft:"auto",marginRight:"auto", width: "80%"}}>
        <ReactStars
        size= {22}
        count={10}
        value={((show.ratings.map(item => item.rating).reduce((prev, next) => prev + next))/(show.ratings.length))}
        isHalf={true}
        edit={false}/>
        </div> : <div>No Ratings Yet</div>}
        {/* {ratings ? ratings.length ?<div style={{marginLeft:"auto",marginRight:"auto", width: "80%"}}><StarRating  size ={20} rating ={((show.ratings.map(item => item.rating).reduce((prev, next) => prev + next))/(show.ratings.length))} /></div>: <div>No Ratings Yet</div> : <div>No Ratings</div> } */}
        <ShowStatus show={show} id={id} allRatings={ratings}  test= {myRatings.filter((rating) =>rating.showId == show.id)}/>
        <p></p>
        </div>
        </div>
        </div>

      )
    }) :   paginatedShows.map((show) => {
        return(
          <div className="col" key={show.id}>
          <div className="container text-center mt-2">
          <div  className="card border border-5  border-dark text-white-50 bg-dark" style={{width: "18rem", border: "solid black"}}>
          <Link to={`/shows/${show.id}`}>
          {/* card-img-top border border-5  border-dark style={{maxWidth:"100%", height: "auto"}} */}
          <img className="card-img-top border border-5 rounded  border-dark" style={{height: "25rem",}}   src={show.image} alt="Card image"/>
          </Link>
          <h4 className="card-title">{show.name}</h4>
          <h4>{show.status}</h4>
          {/* <div>ShowID:{show.id}</div> */}
          {(show.ratings.length)  ? <div className="mt-1">Average Rating: {Math.floor((show.ratings.map(item => item.rating).reduce((prev, next) => prev + next))/(show.ratings.length))}</div>: <div>No Ratings Yet</div>}
          {/* <AverageRating idShow={show.id}/> */}
          {show.ratings.length ? <div className="mt-1">Number of Ratings: {(show.ratings.length)}</div>: <div></div>}
           {(show.ratings.length)  ?<div style={{marginLeft:"auto",marginRight:"auto", width: "80%"}}>
          <ReactStars
          size= {22}
          count={10}
          value={((show.ratings.map(item => item.rating).reduce((prev, next) => prev + next))/(show.ratings.length))}
          isHalf={true}
          edit={false}/>
          </div> : <div>No Ratings Yet</div>}
          {/* {ratings ? ratings.length ?<div style={{marginLeft:"auto",marginRight:"auto", width: "80%"}}><StarRating  size ={20} rating ={((show.ratings.map(item => item.rating).reduce((prev, next) => prev + next))/(show.ratings.length))} /></div>: <div>No Ratings Yet</div> : <div>No Ratings</div> } */}
          <ShowStatus show={show} id={id} allRatings={ratings}  test= {myRatings.filter((rating) =>rating.showId == show.id)}/>
          <p></p>
          </div>
          </div>
          </div>

        )
      })}
     </div>}
     </div>
     <div className="pagination">
  <ul>
    {currentPage > 1 && (
      <>
        <li>
          <button onClick={() => handlePageChange(1)}>First</button>
        </li>
        <li>
          <button onClick={() => handlePageChange(currentPage - 1)}>Back</button>
        </li>
      </>
    )}

    {pageRange.map(page => (
      <li key={page} className={currentPage === page ? 'active' : ''}>
        <button onClick={() => handlePageChange(page)}>{page}</button>
      </li>
    )).slice(currentPage - 1, currentPage + 4)}

    {currentPage < pageCount && (
      <>
        <li>
          <button onClick={() => handlePageChange(currentPage + 1)}>Forward</button>
        </li>
        <li>
          <button onClick={() => handlePageChange(pageCount)}>Last</button>
        </li>
      </>
    )}
  </ul>
</div>
    <div className="text-center" style={{marginTop: "20px"}}>
    <h2><Link className="col" to={`/show/add`}>ADD SHOW</Link> </h2>
    </div>
    </div>
  )

}

export default Shows
