'use client'
import React, { useEffect, useState } from 'react'
import CreateTeam from '@/components/Main/Student/CreateTeam'
import Team from '@/components/Main/Student/Team'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '@/common/Loader'
import store from '@/redux/store';
const Home = () =>{
  const user = useSelector((state)=>state.auth)
  const isFetching = useSelector((state) => state.auth.isFetching);
  const dispatch = useDispatch()
  useEffect(() => {
    const dispatched = async () => {

      dispatch({ type: 'AUTH_STATE_CHANGED' });
    };

    dispatched();
  }, [dispatch]);

  return (
    <>
    {isFetching && <Loader />}
    {
      user?.teamId != null?(<><Team/></>):(<div><CreateTeam/></div>)
    }
    </>
  )
}
export default Home;
