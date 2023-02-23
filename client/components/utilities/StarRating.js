import React from 'react'
import ReactStars from 'react-rating-stars-component'


function StarRating(props) {

  return (
   <>
   <div style={{ width: "95%",marginLeft: "10%", marginRight: "10%"}}>
   <ReactStars
   size= {props.size}
   count={10}
   value={props.rating}
   isHalf={true}
   edit={false}/>
   </div>
   </>
  )
}

export default StarRating
