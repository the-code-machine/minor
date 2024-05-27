'use client'
import React, { useEffect, useState } from 'react'
import CreateTeam from '@/components/Main/Student/CreateTeam'
import Team from '@/components/Main/Student/Team'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '@/common/Loader'
const Home = () =>{
  const user = useSelector((state)=>state.auth)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useDispatch()
  useEffect( () => {
    const dispatched = async()=>{
        setIsSubmitting(true);
     dispatch({ type: 'AUTH_STATE_CHANGED' });
      setIsSubmitting(false);
    }
   dispatched()
  }, []);
  return (
    <>
    {isSubmitting && <Loader />}
    {
      user?.teamId != null?(<><Team/></>):(<div><CreateTeam/></div>)
    }
    </>
  )
}
export default Home;
