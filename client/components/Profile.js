import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import {useForm} from'react-hook-form'
import { fetchSingleUser, updateSingleUser } from '../store/singleUserStore'
import { fetchRatings } from '../store/allRatingsStore'
import { fetchShows } from '../store/allShowsStore'
import  AC from '../../public/AC.jpeg'

export default function Profile() {
  const {register, handleSubmit } = useForm()
  const {id} = useSelector((state) => state.auth )
  const dispatch = useDispatch()
  const [name, setName] = useState();
  const [avatar, setAvatar] = useState();
  const [password, setPassword] = useState();
  const user = useSelector((state) => state.singleUser )
  const shows = useSelector((state) => state.allShows)
  const [editProfile, setEditProfile] = useState()
  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [])
  useEffect(() => {
    dispatch(fetchShows())
    // Safe to add dispatch to the dependencies array
  }, [])
  const ratings = useSelector((state) => state.allRatings)
  useEffect(() => {
    dispatch(fetchRatings())
    // Safe to add dispatch to the dependencies array
  }, [dispatch])



const handleUpdate =(event) => {
  event.preventDefault()
  setName(user.username)
  setAvatar(user.imageUrl)
  setPassword(user.password)
  setEditProfile(id)
}

const handlePic =(event) => {
  event.preventDefault()
  const newPic = shows.filter((show) => show.name == user.favShowName)
  const newUser = {
    id: user.id,
    favShowImage: newPic[0].image
  }
  dispatch(updateSingleUser(newUser))
}

const handleChange = (event) => {
  event.preventDefault()
  setName(event.target.value)
}

const handleChange2 = (event) => {
  event.preventDefault()
  setAvatar(event.target.value)
  // console.log("HA", like)
}

const handleChange3 = (event) => {
  event.preventDefault()
  setPassword(event.target.value)
  // console.log("HA", like)
}

const handleUpload = (event) => {
  event.preventDefault();
  const file = event.target.files[0];
  setSelectedFile(file);
  setPreview(URL.createObjectURL(file));
};

// const onSubmit =(data) =>{
//   console.log("EVENT", data.picture[0].name)
//   user.imageUrl = data.picture[0].name
//   console.log("new", user)
//   dispatch(updateSingleUser(user))
// }

const handleClick = (e) => {
  e.preventDefault();
  const file = avatar[0];
  const newUser = {
    id: user.id,
    username: name,
    password: password,
    imageUrl: avatar ? URL.createObjectURL(file) : user.imageUrl,
  };
  dispatch(updateSingleUser(newUser));
  setEditProfile("");
};


  return (
    <div>
      {editProfile == id? <div >
        <form className="col" onSubmit={handleSubmit(handleClick)}>
  <div>
    <div className="col">
      <label>
        <h2 htmlFor="username" style={{ marginRight: "10px" }}>
          User Name:{" "}
        </h2>
      </label>
      <input
        name="username"
        onChange={handleChange}
        type="text"
        placeholder={user.username}
      />
    </div>
    <div className="col">
      <label>
        <h2 style={{ marginRight: "10px" }}>Avatar: </h2>
      </label>
      <input
        type="file"
        name="avatar"
        onChange={(e) => {
          setAvatar(e.target.files[0]);
        }}
      />
    </div>
    <img
      className="rounded-circle border border-5  border-dark"
      style={{ width: "18rem" }}
      src={avatar ? URL.createObjectURL(avatar) : user.imageUrl}
    />
    <div className="col">
      <label>
        <h2 htmlFor="password" style={{ marginRight: "10px" }}>
          Password:{" "}
        </h2>{" "}
      </label>
      <input
        name="password"
        onChange={handleChange3}
        type="text"
        placeholder={user.password}
      />
    </div>
  </div>
  <h2 className="text-center">
    <button className="btn btn-primary" type="submit">
      Update Profile
    </button>
  </h2>
</form>
    <h2 className='text-center'><button className='btn btn-primary' onClick={handleClick}>Update Profile</button></h2>
  </div>:
      <div>
    <div className="text-center">
    <div className="col"><h1 className="border rounded border-5  border-dark text-white-50 bg-dark" style={{marginBottom: "10px", marginLeft: "auto", marginRight: "auto", width: "25rem"}}>Profile</h1></div>
    </div>
    <div className="text-center">
    {(user.username === 'Ac') ? <div className="ac rounded" style={{marginTop: "10px", marginBottom: "10px", width: "8rem", height: "8rem", marginRight: "auto", marginLeft: "auto"}}></div> :
    <div></div> }
    {(user.username === 'Val') ? <div className="val rounded" style={{marginTop: "10px", marginBottom: "10px", width: "8rem", height: "8rem", marginRight: "auto", marginLeft: "auto"}}></div> :
    <div></div> }
    {(user.username === 'Jeff') ? <div className="jeff rounded" style={{marginTop: "10px", marginBottom: "10px", width: "8rem", height: "8rem", marginRight: "auto", marginLeft: "auto"}}></div> :
    <div></div> }
    {(user.username === 'Ryan') ? <div className="ryan rounded" style={{marginTop: "10px", marginBottom: "10px", width: "8rem", height: "8rem", marginRight: "auto", marginLeft: "auto"}}></div> :
    <div></div> }
    <div style={{marginTop: "10px"}}><button className='btn btn-primary'  onClick={handleUpdate}>Update Profile</button></div>
    </div>
    {/* <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('picture')}  type="file" name="picture" />
      <button>Submit</button>
    </form> */}
    <div className="border border-5 rounded  border-dark text-white-50 bg-dark text-center" style={{marginTop: "10px", width: "40rem", marginLeft: "auto", marginRight: "auto",}}><h2 className="border border-5 rounded  border-dark text-white-50 bg-dark">Fav Show: {user.favShowName}</h2> </div>
    <div className="text-center">
    <div>
    <div className="text-center"><img className="card border border-5  border-dark" style={{width: "18rem", marginBottom: "10px", marginTop: '15px', marginLeft: "auto", marginRight: "auto"}}  src={user.favShowImage}/>
    <button className='btn btn-primary' onClick={handlePic}>Update Pic</button>
    </div>
    </div>
    </div>
    </div>}
    </div>
  )
}
