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

console.log('user', user)

const handleUpdate =(event) => {
  event.preventDefault()
  setName(user.username)
  setAvatar(user.imageUrl)
  setEditProfile(id)
}

const handlePic =(event) => {
  event.preventDefault()
  const newPic = shows.filter((show) => show.name == user.favShowName)
  console.log("NEW", newPic[0].image)
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
    password: user.password,
    imageUrl: avatar,
    // admin: user.admin,
  }
  dispatch(updateSingleUser(newUser))
  setEditProfile("")
}

console.log("SHOWSSS", shows)

  return (
    <div>
      {editProfile == id? <div >
    <form>
      <div >
        <div>
        <label>Show Name</label>
          <input name='username' onChange={handleChange}  type="text" placeholder={user.username}/>
        </div>
        <div >
          <label>Avatar</label>
          <select  onChange={handleChange2} name="imageUrl" className="form-control">
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
          <option value="https://twitter.com/kuru_bwa/status/1623763736040206336?s=46&t=Gi08zNfqxftfHCVSELB12w">Tim Robinson</option>
          <option value="https://tr.rbxcdn.com/dfe258d22c61cac01b86015d135c2314/420/420/Image/Png">Saul Goodman</option>
          </select>
        </div>
      </div>
    </form>
    <button onClick={handleClick}>Update</button>
  </div>:
      <div>
    <div>Profile</div>
    <img style={{width: "18rem"}}  src={user.imageUrl}/>
    {/* <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('picture')}  type="file" name="picture" />
      <button>Submit</button>
    </form> */}
    <div>Name: {user.favShowName}</div>
    <img style={{width: "18rem"}}  src={user.favShowImage}/>
    <div>
    <button onClick={handleUpdate}>Update Profile</button>
    <button onClick={handlePic}>Update Pic</button>
    </div>
    </div>}
    </div>
  )
}
