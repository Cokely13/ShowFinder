import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import {useForm} from'react-hook-form'
import { fetchSingleUser, updateSingleUser } from '../store/singleUserStore'
import { fetchRatings } from '../store/allRatingsStore'
import { fetchShows } from '../store/allShowsStore'

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

// const onSubmit =(data) =>{
//   console.log("EVENT", data.picture[0].name)
//   user.imageUrl = data.picture[0].name
//   console.log("new", user)
//   dispatch(updateSingleUser(user))
// }

const handleClick = (e) => {
  e.preventDefault()
  const newUser = {
    id: user.id,
    username: name,
    password: password,
    imageUrl: avatar,
    // admin: user.admin,
  }
  dispatch(updateSingleUser(newUser))
  setEditProfile("")
}


  return (
    <div>
      {editProfile == id? <div >
    <form className="col">
      <div >
      <div className="col">
        <label><h2 htmlFor="username" style={{marginRight: "10px"}}>User Name: </h2></label>
          <input name='username' onChange={handleChange}  type="text" placeholder={user.username}/>
          </div>
          <div className="col">
          {/* <div className="col"> */}
          <label><h2 style={{marginRight: "10px"}}>Avatar: </h2></label>
          <select  onChange={handleChange2} name="imageUrl" >
        <option selected value={user.imageUrl}>Current Avatar</option>
          <option value="https://cdn2.iconfinder.com/data/icons/super-hero/154/ironman-head-comics-avatar-iron-man-512.png">Ironman</option>
          <option value="https://cdn-dynamics.azurewebsites.net/Content/Index/c83bcac3-ea7d-4d7b-9104-c716a6b3e9b7">Black Panther</option>
          <option value="https://e7.pngegg.com/pngimages/321/676/png-clipart-hulk-avengers-age-of-ultron-iron-man-film-marvel-cinematic-universe-wakanda-marvel-avengers-assemble-fictional-character.png">Hulk</option>
          <option value="https://whatsondisneyplus.com/wp-content/uploads/2022/08/she-hulk-wodp.png">She-Hulk</option>
          <option value="https://whatsondisneyplus.com/wp-content/uploads/2022/12/spiderman.png">Spiderman</option>
          <option value="https://avatars.akamai.steamstatic.com/d32b22dadec46cf620e100a205558b8558382d0c_full.jpg">Tony Soprano</option>
          <option value="https://upload.wikimedia.org/wikipedia/en/b/b7/Omar_Little.png">Omar Little</option>
          <option value="https://openseauserdata.com/files/05a9e4e540ab76d4b8b3bfcceadaec0a.jpg">Walter White</option>
          <option value="https://pbs.twimg.com/media/CnKJ_2vWAAAhe6W?format=jpg&name=large">Don Draper</option>
          <option value="https://pbs.twimg.com/media/EaWJlsmWkAAg5VM.jpg">Jon Snow</option>
          <option value="https://s.studiobinder.com/wp-content/uploads/2018/09/Seinfeld-Scripts-Kramer-Avatar.png?resolution=1680,2">Kramer</option>
          <option value="https://static1.personality-database.com/profile_images/a727809cde6c4b85a0b3aa5d354baa14.png">Selina Meyer</option>
          <option value="https://statcdn.fandango.com/MPX/image/NBCU_Fandango/896/383/thumb_B43D145F-1C2B-4C90-A761-488EB16C3F59.jpg">Tim Robinson</option>
          <option value="https://tr.rbxcdn.com/dfe258d22c61cac01b86015d135c2314/420/420/Image/Png">Saul Goodman</option>
          <option value="https://i.pinimg.com/originals/d1/70/2f/d1702f4ba2dad0d4478d69583c570d74.jpg">Archer</option>
          </select>
          {/* </div> */}
          </div>
          <img className="rounded-circle border border-5  border-dark"  style={{width: "18rem"}}  src={avatar}/>
          <div className="col">
          <label><h2 htmlFor="password" style={{marginRight: "10px"}}>Password: </h2> </label>
          <input name='password' onChange={handleChange3}  type="text" placeholder={user.password}/>
          </div>
      </div>
    </form>
    <h2 className='text-center'><button className='btn btn-primary' onClick={handleClick}>Update Profile</button></h2>
  </div>:
      <div>
    <div className="text-center">
    <div className="col"><h1 className="border rounded border-5  border-dark text-white-50 bg-dark" style={{marginBottom: "10px", marginLeft: "auto", marginRight: "auto", width: "25rem"}}>Profile</h1></div>
    </div>
    <div className="text-center">
    <img className="rounded-circle border border-5  border-dark" style={{width: "18rem"}}  src={user.imageUrl}/>
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
