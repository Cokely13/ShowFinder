import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import {useForm} from'react-hook-form'
import { fetchSingleUser, updateSingleUser } from '../store/singleUserStore'
import { fetchRatings } from '../store/allRatingsStore'

export default function Profile() {
  const {register, handleSubmit } = useForm()
  const {id} = useSelector((state) => state.auth )
  const dispatch = useDispatch()
  const [name, setName] = useState();
  const [avatar, setAvatar] = useState();
  const user = useSelector((state) => state.singleUser )
  const [editProfile, setEditProfile] = useState()
  useEffect(() => {
    dispatch(fetchSingleUser(id))
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
  console.log("SHOW", newUser)
  dispatch(updateSingleUser(newUser))
  setEditProfile("")
}


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
          </select>
        </div>
      </div>
    </form>
    <button onClick={handleClick}>Edit Profile</button>
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
    </div>
    </div>}
    </div>
  )
}
