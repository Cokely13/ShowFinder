import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { fetchUsers } from '../store/allUsersStore'
import { fetchSingleUser} from '../store/singleUserStore'
import { createFriend } from '../store/allFriendsStore'
import { fetchFriends } from '../store/allFriendsStore'

export default function Users() {
  const dispatch = useDispatch()
  const {id} = useSelector((state) => state.auth )
  const [stateReload, setStateReload] = useState(1);
  const friends = useSelector((state) => state.allFriends)
  useEffect(() => {
    dispatch(fetchUsers())

    // Safe to add dispatch to the dependencies array
  }, [])
  useEffect(() => {
    dispatch(fetchFriends())

    // Safe to add dispatch to the dependencies array
  }, [])
  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [])

  function useForceUpdate() {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
      setTick(tick => tick + 1);
    }, [])
    return update;
  }

  const things = useSelector((state) => state.singleUser )
  const users = useSelector((state) => state.allUsers)


  const addFriend=(event, user) =>{
    event.preventDefault()
    const newFriend ={
      userId: id,
      friendId: user.id,
      friendName: user.username
    }
    setStateReload(stateReload + 1)
    dispatch(createFriend(newFriend))
    useForceUpdate()

  }

  const myFriends = things.friends


  return (
    <div>
    <h1 className="border rounded border-5  border-dark text-white-50 bg-dark text-center" style={{width: "8rem", marginLeft: "auto", marginRight: "auto"}}>Users </h1>
    {users? users.filter((user) =>user.id !== id).map((user)=> {
      return(
        myFriends ? myFriends.filter((friend) => friend.friendId == user.id).length ?  <div className="col" key={user.id}>
        <div className="container text-center mt-2" key={user.id} >
    <div   className="card border border-primary border-5 text-white-50 bg-dark" style={{width: "18rem", marginLeft: "auto", marginRight: "auto"}}>
    <img className="card-img-top rounded-circle border border-5  border-dark"  style={{width: "75%", marginLeft: "auto", marginRight: "auto", marginTop: "10px", marginBottom: "10px"}} src={user.imageUrl} alt="Card image"/>
      <h3><Link to={`/users/${user.id}`} >{user.username}</Link></h3>
      <h5>Favorite Show: {user.favShowName}</h5>
      </div></div></div> :
        <div className="col" key={user.id}>
          <div className="container text-center mt-2" >
      <div   className="card border border-dark text-white-50 bg-dark" style={{width: "18rem", marginLeft: "auto", marginRight: "auto"}}>
      <img className="card-img-top rounded-circle border border-5   border-dark"  style={{width: "75%", marginLeft: "auto", marginRight: "auto", marginTop: "10px", marginBottom: "10px"}} src={user.imageUrl} alt="Card image"/>
        <h3><Link to={`/users/${user.id}`} >{user.username}</Link></h3>
        <h5>Favorite Show: {user.favShowName}</h5>
      <div className="text-center">
        <button className="btn btn-primary justify-content-center" style={{width: "75%", content: "center", marginTop: "10px", marginBottom: "10px"}} onClick={event => addFriend(event, user)}>Add Friend</button>
        </div>
        </div></div></div> : <div>CHECK</div>
      )}) : <div>Hey</div>}
      </div>
  )
}
