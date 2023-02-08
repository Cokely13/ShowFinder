import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {useForm} from'react-hook-form'
import { fetchUsers } from '../store/allUsersStore'
import { fetchSingleUser, updateSingleUser } from '../store/singleUserStore'
import { fetchRatings } from '../store/allRatingsStore'

export default function Profile() {
  const {register, handleSubmit } = useForm()
  const {id} = useSelector((state) => state.auth )
  const dispatch = useDispatch()
  const user = useSelector((state) => state.singleUser )
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

const onSubmit =(data) =>{
  console.log("EVENT", data.picture[0].name)
  user.imageUrl = data.picture[0].name
  console.log("new", user)
  dispatch(updateSingleUser(user))
}


  return (
    <div>
    <div>Profile</div>
    <img style={{width: "18rem"}}  src={user.imageUrl}/>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('picture')}  type="file" name="picture" />
      <button>Submit</button>
    </form>
    </div>
  )
}
