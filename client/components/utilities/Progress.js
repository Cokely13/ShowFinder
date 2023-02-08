import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Progress() {


 return (
  <div>
  <div className="progress">
  <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<div className="progress">
  <div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<div className="progress">
  <div className="progress-bar" role="progressbar" style={{width: "50%"}}  aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<div className="progress">
  <div className="progress-bar" role="progressbar" style={{width: "75%"}}  aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<div className="progress">
  <div className="progress-bar" role="progressbar" style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
</div>
</div>
 )
 }

