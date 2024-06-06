'use client'
import Loader from "@/common/Loader";
import { Analysis } from "@/components/Main/Student/Analysis";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function Home() {
  const dispatch = useDispatch()
  const isFetching = useSelector((state)=>state.project.isFetching)
  useEffect(() => {
    const dispatched = async () => {
    
      dispatch({ type: 'AUTH_STATE_CHANGED' });
      dispatch({ type: 'Team_STATE_CHANGED' });
      dispatch({ type: 'PROJECT_STATE_CHANGED' });
    };

    dispatched();
  }, []);

  return (
<>
{ isFetching && <Loader/>}
<Analysis/>
</>
  );
}
