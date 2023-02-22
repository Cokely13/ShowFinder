import React from 'react'
import ReactStars from 'react-rating-stars-component'


function StarRating(props) {
  // const rating = 2
//   const stars = []

//   console.log("star", stars)
//  for (let i = 1; i <=10; i++){
//     if (i <=rating) {
//       stars.push(<i key={i} className="fa-solid fa-star text-warning"></i>)
//     } else if (i === Math.ceil(rating) && !Number.isInteger(rating)){
//       stars.push(<i key={i} className="fa-regular fa-star-half-stroke"></i>)
//     }
//     else{
//       stars.push(<i key={i} className="fa-regular fa-star"></i>)
//     }
//  }
  return (
   <>
   <ReactStars
   size= {20}
   count={10}
   value={props.rating}
   isHalf={true}
   edit={false}/>
   </>
  )
}

export default StarRating
