'use client'
import { CreateProject } from '@/components/Main/Student/CreateProject'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Loader from '@/common/Loader'
const Page =()=> {
  const isFetching = useSelector((state) => state.team.isFetching);
  const dispatch = useDispatch()
  useEffect(() => {
    const dispatched = async () => {
      dispatch({ type: 'AUTH_STATE_CHANGED' });
      dispatch({ type: 'Team_STATE_CHANGED' });
      dispatch({ type: 'PROJECT_STATE_CHANGED' });
      
    };

    dispatched();
  }, []);

  return (
    <div>
      {isFetching && <Loader/>}
      <CreateProject/></div>
  )
}

export default Page