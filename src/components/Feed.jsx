import React, { useEffect } from 'react'
import axios from 'axios'
import {BASE_URL} from "../utils/constants"
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const feed = useSelector((store)=>store.feed)
  const dispatch = useDispatch();
  const getFeed = async () =>{
    if(feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feeds" , {withCredentials:true});
    dispatch(addFeed(res.data));
    } catch (error) {
      console.log("error" + error)
    }
    
  }

  useEffect(()=>{
    getFeed();
  },[]);

  return (
    feed && (
    <div className='flex justify-center my-11'>
      <UserCard user={feed[0]}/>
    </div>
    )
  )
}

export default Feed
